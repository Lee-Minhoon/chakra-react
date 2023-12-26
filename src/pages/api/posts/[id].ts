import type { NextApiRequest, NextApiResponse } from "next";
import { deletePost, getPost, updatePost } from ".";
import { sleep } from "../utils";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  sleep(500);
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
