import type { NextApiRequest, NextApiResponse } from "next";
import { writeSession } from ".";
import { readUsers } from "../users";
import { sleep } from "../utils";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  sleep(200);
  switch (req.method) {
    case "POST":
      return signin(req, res);
    default:
      return res.status(405).end();
  }
}

export const signin = (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.body;

  const users = readUsers();
  const user = users.find((user) => user.email === email);

  if (!user) {
    return res.status(401).json({ message: "email is not registered" });
  }

  try {
    writeSession(user);
  } catch {
    return res.status(500).json({ data: null, message: "failed" });
  }

  return res.status(200).json({ data: user, message: "success" });
};
