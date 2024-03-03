import { NextApiRequest, NextApiResponse } from "next";
import { RequiredKeysOf } from "type-fest";
import { Order, Post } from "../types";
import { delayForDev } from "../utils";
import { readPosts, readPostsWithUser, writePosts } from "./db";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  delayForDev(500);
  switch (req.method) {
    case "GET":
      const { page, cursor, limit } = req.query;
      if (page && limit) return getPostsByPage(req, res);
      if (cursor && limit) return getPostsByCursor(req, res);
      return getPosts(req, res);
    case "POST":
      return createPost(req, res);
    default:
      return res.status(405).end();
  }
}

// [GET] /api/posts
const getPosts = async (req: NextApiRequest, res: NextApiResponse) => {
  const { sort, order } = req.query;

  try {
    const posts = await readPostsWithUser(
      sort as RequiredKeysOf<Post> & "user_name",
      order as Order
    );

    return res
      .status(200)
      .json({ data: posts, message: "Successfully retrieved posts" });
  } catch {
    return res.status(500).json({ data: null, message: "Failed to get posts" });
  }
};

// [GET] /api/posts
const getPostsByPage = async (req: NextApiRequest, res: NextApiResponse) => {
  const { page, limit, sort, order, search } = req.query;

  const offset = (Number(page) - 1) * Number(limit);

  try {
    const posts = await readPostsWithUser(
      sort as RequiredKeysOf<Post> & "user_name",
      order as Order,
      search as string
    );
    const slicedPosts = posts.slice(
      Number(offset),
      Number(offset) + Number(limit)
    );

    return res.status(200).json({
      data: { total: posts.length, data: slicedPosts },
      message: "Successfully retrieved posts",
    });
  } catch {
    return res.status(500).json({ data: null, message: "Failed to get posts" });
  }
};

// [GET] /api/posts
const getPostsByCursor = async (req: NextApiRequest, res: NextApiResponse) => {
  const { cursor, limit, sort, order, search } = req.query;

  try {
    const posts = await readPostsWithUser(
      sort as RequiredKeysOf<Post> & "user_name",
      order as Order,
      search as string
    );
    const index = posts.findIndex((_, idx) => idx === Number(cursor));
    const slicedPosts = posts.slice(index, index + Number(limit));

    const previous = index - Number(limit);
    const next = index + Number(limit);

    return res.status(200).json({
      data: {
        previous: previous >= 0 ? previous : null,
        next: next < posts.length ? next : null,
        data: slicedPosts,
      },
      message: "Successfully retrieved posts",
    });
  } catch {
    return res.status(500).json({ data: null, message: "Failed to get posts" });
  }
};

// [POST] /api/posts
const createPost = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId, title, content } = req.body;

  try {
    const posts = await readPosts();

    if (posts.length > 999) {
      return res
        .status(400)
        .json({ data: null, message: "Post creation limit exceeded" });
    }

    const newPost: Post = {
      id: (posts[posts.length - 1]?.id ?? 0) + 1,
      userId,
      title,
      content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    posts.push(newPost);

    await writePosts(posts);

    return res
      .status(200)
      .json({ data: newPost.id, message: `Post ${newPost.id} created` });
  } catch {
    return res
      .status(500)
      .json({ data: null, message: `Post ${title} creation failed` });
  }
};
