import { getRandomString } from "@/utils";
import { NextApiRequest, NextApiResponse } from "next";
import { readUsers } from "../../users/db";
import { sleep } from "../../utils";
import { readPosts, writePosts } from "../db";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  sleep(500);
  switch (req.method) {
    case "POST":
      return createTestPosts(req, res);
    default:
      return res.status(405).end();
  }
}

// [POST] /api/posts/test/:count
const createTestPosts = async (req: NextApiRequest, res: NextApiResponse) => {
  const { count } = req.query;

  try {
    const users = await readUsers();
    const posts = await readPosts();

    if (posts.length > 10000) {
      return res
        .status(400)
        .json({ data: null, message: "Post creation limit exceeded" });
    }

    const lastId = posts[posts.length - 1]?.id ?? 0;
    for (let i = 0; i < +(count ?? 10); i++) {
      const currentId = lastId + i + 1;
      posts.push({
        id: currentId,
        userId: users[Math.floor(Math.random() * users.length)].id,
        title: getRandomString(10),
        content: getRandomString(100),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }

    await writePosts(posts);

    return res
      .status(200)
      .json({ data: posts, message: "Successfully created test posts" });
  } catch {
    return res
      .status(500)
      .json({ data: null, message: "Failed to create test posts" });
  }
};
