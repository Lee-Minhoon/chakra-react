import type { NextApiRequest, NextApiResponse } from "next";
import { readSession } from ".";
import { sleep } from "../utils";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  sleep(200);
  switch (req.method) {
    case "GET":
      return me(req, res);
    default:
      return res.status(405).end();
  }
}

export const me = (req: NextApiRequest, res: NextApiResponse) => {
  const session = readSession();

  return res.status(200).json({ data: session, message: "success" });
};
