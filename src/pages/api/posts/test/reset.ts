import type { NextApiRequest, NextApiResponse } from "next";
import { resetTestPosts } from "..";
import { sleep } from "../../utils";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  sleep(500);
  switch (req.method) {
    case "POST":
      return resetTestPosts(req, res);
    default:
      return res.status(405).end();
  }
}
