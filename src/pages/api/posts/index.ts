import { RequiredKeys } from "@/types";
import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { Order, Post, readDB } from "../db";
import { sleep } from "../utils";

export const readPosts = (sort?: RequiredKeys<Post>, order?: Order) => {
  try {
    const db = readDB();
    return db.posts;
  } catch (err) {
    console.log("failed to read db.json");
    throw err;
  }
};

export const readPostsWithUser = (
  sort?: RequiredKeys<Post> & "user_name",
  order?: Order
) => {
  try {
    const db = readDB();
    const posts = db.posts.map((post) => ({
      ...post,
      user: db.users.find((user) => user.id === post.userId),
    }));
    if (sort && order) {
      return posts.sort((a, b) => {
        if (order === "asc") {
          if (sort === "user_name") {
            if ((a.user?.name ?? "") < (b.user?.name ?? "")) return -1;
            if ((a.user?.name ?? "") > (b.user?.name ?? "")) return 1;
          }
          if (a[sort] < b[sort]) return -1;
          if (a[sort] > b[sort]) return 1;
        } else {
          if (sort === "user_name") {
            if ((a.user?.name ?? "") > (b.user?.name ?? "")) return -1;
            if ((a.user?.name ?? "") < (b.user?.name ?? "")) return 1;
          }
          if (a[sort] > b[sort]) return -1;
          if (a[sort] < b[sort]) return 1;
        }
        return 0;
      });
    } else {
      return posts;
    }
  } catch (err) {
    console.log("failed to read db.json");
    throw err;
  }
};

export const writePosts = (posts: Post[]) => {
  try {
    const db = readDB();
    fs.writeFileSync(
      path.join(process.cwd(), "/db.json"),
      JSON.stringify({ ...db, posts }, null, 2),
      "utf8"
    );
  } catch (err) {
    console.log("failed to write db.json");
    throw err;
  }
};

export let posts: Post[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  sleep(500);
  switch (req.method) {
    case "GET":
      const { page, cursor, limit } = req.query;
      if (page && limit) return getPostsByPage(req, res);
      if (cursor && limit) return getPostsByCursor(req, res);
      return getPosts(req, res);
    case "POST":
      return postPost(req, res);
    default:
      return res.status(405).end();
  }
}

export const getPost = (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    const posts = readPostsWithUser();
    const post = posts.find((user) => user.id === Number(id));
    return res.status(200).json({ data: post, message: "success" });
  } catch {
    return res.status(500).json({ data: null, message: "failed" });
  }
};

export const getPosts = (req: NextApiRequest, res: NextApiResponse) => {
  const { sort, order } = req.query;

  try {
    const posts = readPostsWithUser(
      sort as RequiredKeys<Post> & "user_name",
      order as Order
    );
    return res.status(200).json({ data: posts, message: "success" });
  } catch {
    return res.status(500).json({ data: null, message: "failed" });
  }
};

export const getPostsByPage = (req: NextApiRequest, res: NextApiResponse) => {
  const { page, limit, sort, order } = req.query;

  const offset = (Number(page) - 1) * Number(limit);

  try {
    const posts = readPostsWithUser(
      sort as RequiredKeys<Post> & "user_name",
      order as Order
    );
    const slicedPosts = posts.slice(
      Number(offset),
      Number(offset) + Number(limit)
    );

    return res.status(200).json({
      data: { total: posts.length, data: slicedPosts },
      message: "success",
    });
  } catch {
    return res.status(500).json({ data: null, message: "failed" });
  }
};

export const getPostsByCursor = (req: NextApiRequest, res: NextApiResponse) => {
  const { cursor, limit, sort, order } = req.query;

  try {
    const posts = readPostsWithUser(
      sort as RequiredKeys<Post> & "user_name",
      order as Order
    );
    const index = posts.findIndex((_, idx) => idx === Number(cursor));
    const slicedPosts = posts.slice(index, index + Number(limit));

    return res.status(200).json({
      data: {
        previous: posts[index - Number(limit)]?.id ?? null,
        next: posts[index + Number(limit)]?.id ?? null,
        data: slicedPosts,
      },
      message: "success",
    });
  } catch {
    return res.status(500).json({ data: null, message: "failed" });
  }
};

export const postPost = (req: NextApiRequest, res: NextApiResponse) => {
  const { userId, title, content } = req.body;

  try {
    const posts = readPosts();

    const newPost: Post = {
      id: (posts[posts.length - 1]?.id ?? 0) + 1,
      userId,
      title,
      content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    posts.push(newPost);

    try {
      writePosts(posts);
    } catch {
      return res.status(500).json({ data: null, message: "failed" });
    }

    return res.status(200).json({ data: newPost.id, message: "success" });
  } catch {
    return res.status(500).json({ data: null, message: "failed" });
  }
};

export const updatePost = (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const { title, content } = req.body;

  try {
    let posts = readPosts();
    posts = posts.map((post) => {
      if (post.id === Number(id)) {
        return { ...post, title, content, updatedAt: new Date().toISOString() };
      }
      return post;
    });

    try {
      writePosts(posts);
    } catch {
      return res.status(500).json({ data: null, message: "failed" });
    }

    return res.status(200).json({ data: id, message: "success" });
  } catch {
    return res.status(500).json({ data: null, message: "failed" });
  }
};

export const deletePost = (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    let posts = readPosts();
    posts = posts.filter((user) => user.id !== Number(id));

    try {
      writePosts(posts);
    } catch {
      return res.status(500).json({ data: null, message: "failed" });
    }

    return res.status(200).json({ data: id, message: "success" });
  } catch {
    return res.status(500).json({ data: null, message: "failed" });
  }
};
