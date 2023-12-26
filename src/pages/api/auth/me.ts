import type { NextApiRequest, NextApiResponse } from "next";
import { readSession } from ".";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
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
