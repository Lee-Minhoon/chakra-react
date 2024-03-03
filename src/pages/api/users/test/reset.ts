import { NextApiRequest, NextApiResponse } from "next";
import { readSession } from "../../auth/db";
import { delayForDev } from "../../utils";
import { writeUsers } from "../db";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  delayForDev(500);
  switch (req.method) {
    case "POST":
      return resetTestUsers(req, res);
    default:
      return res.status(405).end();
  }
}

// [DELETE] /api/users/test/reset
const resetTestUsers = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await readSession();

    if (session) {
      return res.status(409).json({
        data: null,
        message: "Please sign out before resetting test users",
      });
    }

    await writeUsers([]);

    return res
      .status(200)
      .json({ data: [], message: "Successfully reset test users" });
  } catch {
    return res
      .status(500)
      .json({ data: null, message: "Failed to reset test users" });
  }
};
