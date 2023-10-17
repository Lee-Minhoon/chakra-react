import { sleep } from "@/utils";
import type { NextApiRequest, NextApiResponse } from "next";

export var posts: { id: number; title: string }[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      return res.status(200).json({ data: posts, message: "success" });
    case "POST":
      const { body } = req;
      const { title } = body;
      sleep(500);
      const newUser = { id: (posts[posts.length - 1]?.id ?? 0) + 1, title };
      posts.push(newUser);
      sleep(500);
      return res.status(200).json({ data: newUser.id, message: "success" });
    default:
      return res.status(405).end();
  }
}

export const getPost = (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id;
  const user = posts.find((user) => user.id === Number(id));
  return res.status(200).json({ data: user, message: "success" });
};

export const updatePost = (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id;
  const { body } = req;
  const { title } = body;
  posts = posts.map((user) => {
    if (user.id === Number(id)) {
      return { id: user.id, title };
    }
    return user;
  });
  sleep(1000);
  return res.status(200).json({ data: id, message: "success" });
};

export const deletePost = (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id;
  posts = posts.filter((user) => user.id !== Number(id));
  sleep(1000);
  return res.status(200).json({ data: id, message: "success" });
};

export const getLikedPosts = (req: NextApiRequest, res: NextApiResponse) => {
  const likedPosts = posts.filter((user) => user.id % 2 === 0);
  return res.status(200).json({ data: likedPosts, message: "success" });
};
