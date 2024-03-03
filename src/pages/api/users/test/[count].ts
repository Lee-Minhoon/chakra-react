import { getRandomEmail, getRandomPhoneNumber, getRandomString } from "@/utils";
import { NextApiRequest, NextApiResponse } from "next";
import { sleep } from "../../utils";
import { readUsers, writeUsers } from "../db";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  sleep(500);
  switch (req.method) {
    case "POST":
      return createTestUsers(req, res);
    default:
      return res.status(405).end();
  }
}

// [PUT] /api/users/test/:count
const createTestUsers = async (req: NextApiRequest, res: NextApiResponse) => {
  const { count } = req.query;

  try {
    const users = await readUsers();

    if (users.length > 10000) {
      return res
        .status(409)
        .json({ data: null, message: "Maximum number of users reached" });
    }

    const lastId = users[users.length - 1]?.id ?? 0;
    for (let i = 0; i < +(count ?? 10); i++) {
      const currentId = lastId + i + 1;
      users.push({
        id: currentId,
        name: getRandomString(10),
        email: getRandomEmail(),
        phone: getRandomPhoneNumber(),
        approved: Math.random() > 0.5,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }

    await writeUsers(users);

    return res
      .status(200)
      .json({ data: users, message: "Successfully created test users" });
  } catch {
    return res
      .status(500)
      .json({ data: null, message: "Failed to create test users" });
  }
};
