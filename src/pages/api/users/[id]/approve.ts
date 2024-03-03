import { NextApiRequest, NextApiResponse } from "next";
import { delayForDev } from "../../utils";
import { readUsers, writeUsers } from "../db";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  delayForDev(500);
  switch (req.method) {
    case "POST":
      return approveUser(req, res);
  }
}

// [PUT] /api/users/:id/approve
const approveUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    let users = await readUsers();
    users = users.map((user) => {
      if (user.id === Number(id)) {
        return { ...user, approved: true, updatedAt: new Date().toISOString() };
      }
      return user;
    });

    await writeUsers(users);

    return res.status(200).json({ data: id, message: `User ${id} approved` });
  } catch (err) {
    return res
      .status(500)
      .json({ data: null, message: `User ${id} approval failed` });
  }
};
