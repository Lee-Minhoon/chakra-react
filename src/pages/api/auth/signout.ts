import type { NextApiRequest, NextApiResponse } from "next";
import { writeSession } from ".";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      return signout(req, res);
    default:
      return res.status(405).end();
  }
}

const signout = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    writeSession(null);
  } catch {
    return res.status(500).json({ data: null, message: "failed" });
  }

  return res.status(200).json({ data: null, message: "success" });
};
