import type { NextApiRequest, NextApiResponse } from "next";
import { deleteUser, getUser, updateUser } from ".";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      return getUser(req, res);
    case "UPDATE":
      return updateUser(req, res);
    case "DELETE":
      return deleteUser(req, res);
    default:
      return res.status(405).end();
  }
}
