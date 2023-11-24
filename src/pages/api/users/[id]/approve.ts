import { sleep } from "@/utils";
import type { NextApiRequest, NextApiResponse } from "next";
import { approveUser } from "..";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  sleep(200);
  switch (req.method) {
    case "POST":
      return approveUser(req, res);
  }
}
