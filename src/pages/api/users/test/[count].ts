import type { NextApiRequest, NextApiResponse } from "next";
import { createTestUsers } from "..";
import { sleep } from "../../utils";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  sleep(200);
  switch (req.method) {
    case "POST":
      return createTestUsers(req, res);
    default:
      return res.status(405).end();
  }
}
