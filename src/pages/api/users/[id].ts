import type { NextApiRequest, NextApiResponse } from "next";
import { deleteUser, updateUser } from "../users";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return res.status(200).json({ data: [], message: "success" });
    case "UPDATE":
      return await updateUser(req, res);
    case "DELETE":
      return await deleteUser(req, res);
    default:
      return res.status(405).end();
  }
}
