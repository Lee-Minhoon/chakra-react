import { NextApiRequest, NextApiResponse } from "next";
import { readUsers } from "../users/db";
import { parseIP, readSession, writeSession } from "./db";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      return signin(req, res);
    default:
      return res.status(405).end();
  }
}

const signin = async (req: NextApiRequest, res: NextApiResponse) => {
  await parseIP(req)
    .then(async (ip) => {
      const { email } = req.body;

      try {
        const users = await readUsers();
        const user = users.find((user) => user.email === email);

        if (!user) {
          return res.status(401).json({ message: "Email is not registered" });
        }

        const session = await readSession();

        await writeSession({ ...session, [ip.toString()]: user.id });

        return res.status(200).json({ data: user, message: "Success" });
      } catch {
        return res.status(500).json({ data: null, message: "Failed" });
      }
    })
    .catch(() => {
      return res
        .status(400)
        .json({ data: null, message: "Failed to parse IP" });
    });
};
