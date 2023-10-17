import type { NextApiRequest, NextApiResponse } from "next";
import { deleteUser, getUser, updateUser } from ".";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return await getUser(req, res);
    case "UPDATE":
      return await updateUser(req, res);
    case "DELETE":
      return await deleteUser(req, res);
    default:
      return res.status(405).end();
  }
}
