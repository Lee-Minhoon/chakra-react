import { NextApiRequest, NextApiResponse } from "next";
import { parseIP, readSession, writeSession } from "./db";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      return signout(req, res);
    default:
      return res.status(405).end();
  }
}

const signout = async (req: NextApiRequest, res: NextApiResponse) => {
  parseIP(req)
    .then(async (ip) => {
      const session = await readSession();
      delete session[ip.toString()];

      try {
        await writeSession(session);

        return res.status(200).json({ data: null, message: "Success" });
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
