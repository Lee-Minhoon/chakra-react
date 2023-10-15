import type { NextApiRequest, NextApiResponse } from "next";
import { deletePost, getPost, updatePost } from ".";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return await getPost(req, res);
    case "UPDATE":
      return await updatePost(req, res);
    case "DELETE":
      return await deletePost(req, res);
    default:
      return res.status(405).end();
  }
}
