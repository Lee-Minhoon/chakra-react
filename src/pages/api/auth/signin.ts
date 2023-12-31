import type { NextApiRequest, NextApiResponse } from "next";
import { writeSession } from ".";
import { readUsers } from "../users";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      return signin(req, res);
    default:
      return res.status(405).end();
  }
}

const signin = (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.body;

  try {
    const users = readUsers();
    const user = users.find((user) => user.email === email);

    if (!user) {
      return res.status(401).json({ message: "Email is not registered" });
    }

    writeSession(user.id);

    return res.status(200).json({ data: user, message: "Success" });
  } catch {
    return res.status(500).json({ data: null, message: "Failed" });
  }
};
