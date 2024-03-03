import { NextApiRequest, NextApiResponse } from "next";
import { sleep } from "../../utils";
import { writePosts } from "../db";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  sleep(500);
  switch (req.method) {
    case "POST":
      return resetTestPosts(req, res);
    default:
      return res.status(405).end();
  }
}

// [DELETE] /api/posts/test/reset
const resetTestPosts = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await writePosts([]);
  } catch {
    return res
      .status(500)
      .json({ data: null, message: "Failed to reset test posts" });
  }

  return res
    .status(200)
    .json({ data: [], message: "Successfully reset test posts" });
};
