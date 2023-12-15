import type { NextApiRequest, NextApiResponse } from "next";
import { deleteUser, getUser, updateUser } from "..";
import { sleep } from "../../utils";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  sleep(200);
  switch (req.method) {
    case "GET":
      return getUser(req, res);
    case "PUT":
      return updateUser(req, res);
    case "DELETE":
      return deleteUser(req, res);
    default:
      return res.status(405).end();
  }
}
