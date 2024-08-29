import {
  ApiResponse,
  CursorQueryParams,
  CursorQueryResponse,
  Order,
  PageQueryParams,
  PageQueryResponse,
  Post,
  PostCreate,
  PostUpdate,
} from "@/apis";
import { ApiRoutes } from "@/constants";
import { Nullable } from "@/types";
import { includesIgnoreCase, randomString, toPath } from "@/utils";
import { DefaultBodyType, http, HttpResponse, PathParams } from "msw";
import { RequiredKeysOf } from "type-fest";
import { readDB, writeDB } from "../db";
import { withAuth } from "../middleware";
import { getQueryParams, toEndpoint } from "../utils";
import { readUsers } from "./user";

export const readPosts = (
  offset?: number,
  limit?: number,
  sort?: RequiredKeysOf<Post>,
  order?: Order,
  search?: string
) => {
  let { posts } = readDB();
  if (search) {
    posts = posts.filter(
      (post) =>
        includesIgnoreCase(post.title, search) ||
        (post.user && includesIgnoreCase(post.user?.name, search))
    );
  }
  if (sort && order) {
    posts = posts.sort((a, b) => {
      if (sort === "user") {
        const comp = (a.user?.name || "") > (b.user?.name || "") ? 1 : -1;
        return order === "asc" ? comp : -comp;
      }
      const comp = a[sort] > b[sort] ? 1 : -1;
      return order === "asc" ? comp : -comp;
    });
  }
  if (offset && limit) {
    posts = posts.slice(offset, offset + limit);
  }
  return posts;
};

const getPosts = http.get<
  PathParams,
  DefaultBodyType,
  ApiResponse<PageQueryResponse<Post>> | ApiResponse<CursorQueryResponse<Post>>
>(toEndpoint(toPath(ApiRoutes.Post)), ({ request }) => {
  const query = getQueryParams<
    PageQueryParams | (CursorQueryParams & { cursor: number })
  >(request);

  if ("page" in query) {
    const { page, limit, sort, order, search } = query;
    const offset = (Number(page) - 1) * Number(limit);
    const posts = readPosts(
      offset,
      Number(limit),
      sort as RequiredKeysOf<Post>,
      order as Order,
      search
    );

    return HttpResponse.json(
      {
        data: { total: readPosts().length, data: posts },
        message: "Successfully fetched posts",
      },
      { status: 206 }
    );
  } else {
    const { cursor, limit, sort, order, search } = query;
    const offset = Number(cursor);
    const posts = readPosts(
      offset,
      Number(limit),
      sort as RequiredKeysOf<Post>,
      order as Order,
      search
    );

    const previous = offset - Number(limit);
    const next = offset + Number(limit);

    return HttpResponse.json(
      {
        data: {
          previous: previous < 0 ? null : previous,
          next: next >= readPosts().length ? null : next,
          data: posts,
        },
        message: "Successfully fetched posts",
      },
      { status: 206 }
    );
  }
});

const getPost = http.get<
  PathParams,
  DefaultBodyType,
  ApiResponse<Nullable<Post>>
>(toEndpoint(ApiRoutes.Post), ({ params }) => {
  const posts = readPosts();
  const post = posts.find((post) => post.id === Number(params.id));

  if (!post) {
    return HttpResponse.json(
      { data: null, message: "Post not found" },
      { status: 404 }
    );
  }

  return HttpResponse.json(
    { data: post, message: "Successfully fetched post" },
    { status: 200 }
  );
});

const createPost = http.post<
  PathParams,
  PostCreate,
  ApiResponse<Nullable<number>>
>(toEndpoint(toPath(ApiRoutes.Post)), async ({ request }) => {
  const posts = readPosts();

  if (posts.length > 999) {
    return HttpResponse.json(
      { data: null, message: "Maximum posts reached" },
      { status: 400 }
    );
  }

  const token = request.headers.get("Authorization")!;
  const [id] = token.split("@");

  const users = readUsers();
  const user = users.find((user) => user.id === Number(id));

  if (!user) {
    return HttpResponse.json(
      { data: null, message: "User not found" },
      { status: 401 }
    );
  }

  const body = await request.json();
  const { title, content } = body;

  const newPost: Post = {
    id: (posts[posts.length - 1]?.id ?? 0) + 1,
    user,
    title,
    content,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  posts.push(newPost);

  writeDB((db) => ({ ...db, posts }));

  return HttpResponse.json(
    { data: newPost.id, message: "Successfully created post" },
    { status: 201 }
  );
});

const updatePost = http.put<
  PathParams,
  PostUpdate,
  ApiResponse<Nullable<number>>
>(toEndpoint(ApiRoutes.Post), async ({ request, params }) => {
  const posts = readPosts();
  const post = posts.find((post) => post.id === Number(params.id));

  if (!post) {
    return HttpResponse.json(
      { data: null, message: "Post not found" },
      { status: 404 }
    );
  }

  const body = await request.json();
  const { title, content } = body;

  post.title = title;
  post.content = content;
  post.updatedAt = new Date().toISOString();

  writeDB((db) => ({ ...db, posts }));

  return HttpResponse.json(
    { data: post.id, message: "Successfully updated post" },
    { status: 200 }
  );
});

const deletePost = http.delete<
  PathParams,
  DefaultBodyType,
  ApiResponse<Nullable<number>>
>(
  toEndpoint(ApiRoutes.Post),
  withAuth(({ params }) => {
    const posts = readPosts();
    const postIndex = posts.findIndex((post) => post.id === Number(params.id));

    if (postIndex === -1) {
      return HttpResponse.json(
        { data: null, message: "Post not found" },
        { status: 404 }
      );
    }

    posts.splice(postIndex, 1);

    writeDB((db) => ({ ...db, posts }));

    return HttpResponse.json(
      { data: Number(params.id), message: "Successfully deleted post" },
      { status: 200 }
    );
  })
);

const resetPosts = http.post<PathParams, DefaultBodyType, ApiResponse<null>>(
  toEndpoint(ApiRoutes.ResetPosts),
  () => {
    writeDB((db) => ({ ...db, posts: [] }));

    return HttpResponse.json(
      { data: null, message: "Successfully reset posts" },
      { status: 200 }
    );
  }
);

const createTestPosts = http.post<PathParams, PostCreate, ApiResponse<null>>(
  toEndpoint(ApiRoutes.CreateTestPosts),
  async ({ request, params }) => {
    const count = Number(params.count);

    const posts = readPosts();

    if (posts.length + count > 999) {
      return HttpResponse.json(
        { data: null, message: "Maximum posts reached" },
        { status: 400 }
      );
    }

    const token = request.headers.get("Authorization")!;
    const [id] = token.split("@");

    const users = readUsers();
    const user = users.find((user) => user.id === Number(id));

    if (!user) {
      return HttpResponse.json(
        { data: null, message: "User not found" },
        { status: 401 }
      );
    }

    for (let i = 0; i < count; i++) {
      const newPost: Post = {
        id: (posts[posts.length - 1]?.id ?? 0) + 1,
        user,
        title: randomString(10),
        content: randomString(1000),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      posts.push(newPost);
    }

    writeDB((db) => ({ ...db, posts }));

    return HttpResponse.json(
      { data: null, message: "Successfully created post" },
      { status: 201 }
    );
  }
);

export const postHandlers = [
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  resetPosts,
  createTestPosts,
];
