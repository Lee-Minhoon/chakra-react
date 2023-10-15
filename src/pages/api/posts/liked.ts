import type { NextApiRequest, NextApiResponse } from "next";
import { getLikedPosts } from ".";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return await getLikedPosts(req, res);
    default:
      return res.status(405).end();
  }
}
