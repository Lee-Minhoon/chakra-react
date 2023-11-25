import type { NextApiRequest, NextApiResponse } from "next";
import { deletePost, getPost, updatePost } from ".";
import { sleep } from "../utils";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  sleep(200);
  switch (req.method) {
    case "GET":
      return getPost(req, res);
    case "UPDATE":
      return updatePost(req, res);
    case "DELETE":
      return deletePost(req, res);
    default:
      return res.status(405).end();
  }
}
