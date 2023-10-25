import { sleep } from "@/utils";
import type { NextApiRequest, NextApiResponse } from "next";
import { resetTestUsers } from "..";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  sleep(500);
  switch (req.method) {
    case "POST":
      return resetTestUsers(req, res);
    default:
      return res.status(405).end();
  }
}
