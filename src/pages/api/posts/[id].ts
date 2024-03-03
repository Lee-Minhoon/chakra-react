import { NextApiRequest, NextApiResponse } from "next";
import { delayForDev } from "../utils";
import { readPosts, readPostsWithUser, writePosts } from "./db";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  delayForDev(500);
  switch (req.method) {
    case "GET":
      return getPost(req, res);
    case "PUT":
      return updatePost(req, res);
    case "DELETE":
      return deletePost(req, res);
    default:
      return res.status(405).end();
  }
}

// [GET] /api/posts/:id
const getPost = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    const posts = await readPostsWithUser();
    const post = posts.find((user) => user.id === Number(id));

    return res.status(200).json({
      data: post ?? null,
      message: `Successfully retrieved post ${id}`,
    });
  } catch {
    return res
      .status(500)
      .json({ data: null, message: `Failed to get post ${id}` });
  }
};
// [PUT] /api/posts/:id
const updatePost = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const { title, content } = req.body;

  try {
    let posts = await readPosts();
    posts = posts.map((post) => {
      if (post.id === Number(id)) {
        return { ...post, title, content, updatedAt: new Date().toISOString() };
      }
      return post;
    });

    await writePosts(posts);

    return res.status(200).json({ data: id, message: `Post ${id} updated` });
  } catch {
    return res
      .status(500)
      .json({ data: null, message: `Post ${id} update failed` });
  }
};
// [DELETE] /api/posts/:id
const deletePost = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    let posts = await readPosts();
    posts = posts.filter((user) => user.id !== Number(id));

    await writePosts(posts);

    return res.status(200).json({ data: id, message: `Post ${id} deleted` });
  } catch {
    return res
      .status(500)
      .json({ data: null, message: `Post ${id} deletion failed` });
  }
};
