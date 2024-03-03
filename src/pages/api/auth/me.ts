import { NextApiRequest, NextApiResponse } from "next";
import { readUsers } from "../users/db";
import { readSession } from "./db";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      return me(req, res);
    default:
      return res.status(405).end();
  }
}

export const me = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const users = await readUsers();
    const session = await readSession();

    const user = users.find((user) => user.id === session);

    return res.status(200).json({ data: user ?? null, message: "Success" });
  } catch {
    return res.status(500).json({ data: null, message: "Failed" });
  }
};
