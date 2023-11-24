import type { NextApiRequest, NextApiResponse } from "next";
import { sleep } from "../utils";

interface Post {
  id: number;
  title: string;
  content: string;
}

export let posts: Post[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  sleep(500);
  switch (req.method) {
    case "GET":
      return getPosts(req, res);
    case "POST":
      return postPost(req, res);
    default:
      return res.status(405).end();
  }
}

export const getPost = (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const user = posts.find((post) => post.id === Number(id));
  return res.status(200).json({ data: user, message: "success" });
};

export const getPosts = (req: NextApiRequest, res: NextApiResponse) => {
  return res.status(200).json({ data: posts, message: "success" });
};

export const getPostsByOffset = (req: NextApiRequest, res: NextApiResponse) => {
  const { offset, limit } = req.query;
  const slicedPosts = posts.slice(
    Number(offset),
    Number(offset) + Number(limit)
  );
  return res.status(200).json({
    data: { total: posts.length, data: slicedPosts },
    message: "success",
  });
};

export const getPostsByCursor = (req: NextApiRequest, res: NextApiResponse) => {
  const { cursor, limit } = req.query;
  const index = posts.findIndex((user) => user.id === Number(cursor));
  const slicedPosts = posts.slice(index, index + Number(limit));
  return res.status(200).json({
    data: {
      previous: posts[index - Number(limit)]?.id ?? null,
      next: posts[index + Number(limit)]?.id ?? null,
      data: slicedPosts,
    },
    message: "success",
  });
};

export const postPost = (req: NextApiRequest, res: NextApiResponse) => {
  const { title, content } = req.body;
  const newPost = {
    id: (posts[posts.length - 1]?.id ?? 0) + 1,
    title,
    content,
  };
  posts.push(newPost);
  return res.status(200).json({ data: newPost.id, message: "success" });
};

export const updatePost = (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const { title, content } = req.body;
  posts = posts.map((post) => {
    if (post.id === Number(id)) {
      return { id: post.id, title, content };
    }
    return post;
  });
  return res.status(200).json({ data: id, message: "success" });
};

export const deletePost = (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  posts = posts.filter((post) => post.id !== Number(id));
  return res.status(200).json({ data: id, message: "success" });
};

export const getLikedPosts = (req: NextApiRequest, res: NextApiResponse) => {
  const likedPosts = posts.filter((post) => post.id % 2 === 0);
  return res.status(200).json({ data: likedPosts, message: "success" });
};
