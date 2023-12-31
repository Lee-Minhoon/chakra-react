import type { NextApiRequest, NextApiResponse } from "next";
import { readSession } from ".";
import { readUsers } from "../users";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      return me(req, res);
    default:
      return res.status(405).end();
  }
}

export const me = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const users = readUsers();
    const session = readSession();

    const user = users.find((user) => user.id === session);

    return res.status(200).json({ data: user ?? null, message: "Success" });
  } catch {
    return res.status(500).json({ data: null, message: "Failed" });
  }
};
