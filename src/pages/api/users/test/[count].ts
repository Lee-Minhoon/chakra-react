import { sleep } from "@/utils";
import type { NextApiRequest, NextApiResponse } from "next";
import { createTestUsers } from "..";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  sleep(500);
  switch (req.method) {
    case "POST":
      return createTestUsers(req, res);
    default:
      return res.status(405).end();
  }
}
