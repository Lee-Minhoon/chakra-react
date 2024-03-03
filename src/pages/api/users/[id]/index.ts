import { NextApiRequest, NextApiResponse } from "next";
import { parseIP, readMySession } from "../../auth/db";
import { delayForDev } from "../../utils";
import { readUsers, writeUsers } from "../db";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  delayForDev(500);
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

// [GET] /api/users/:id
const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    const users = await readUsers();
    const user = users.find((user) => user.id === Number(id));

    return res.status(200).json({
      data: user ?? null,
      message: `Successfully retrieved user ${id}`,
    });
  } catch {
    return res
      .status(500)
      .json({ data: null, message: `Failed to get user ${id}` });
  }
};

// [PUT] /api/users/:id
const updateUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const { name, email, phone, profile } = req.body;

  try {
    let users = await readUsers();
    users = users.map((user) => {
      if (user.id === Number(id)) {
        return {
          ...user,
          name,
          email,
          phone,
          profile,
          updatedAt: new Date().toISOString(),
        };
      }
      return user;
    });

    await writeUsers(users);

    return res.status(200).json({ data: id, message: `User ${id} updated` });
  } catch {
    return res
      .status(500)
      .json({ data: null, message: `User ${id} update failed` });
  }
};

// [DELETE] /api/users/:id
const deleteUser = async (req: NextApiRequest, res: NextApiResponse) => {
  parseIP(req)
    .then(async (ip) => {
      const { id } = req.query;

      try {
        const session = await readMySession(ip);

        if (session === Number(id)) {
          return res.status(409).json({
            data: null,
            message: "Please sign out before deleting user",
          });
        }

        let users = await readUsers();
        users = users.filter((user) => user.id !== Number(id));

        await writeUsers(users);

        return res
          .status(200)
          .json({ data: id, message: `User ${id} deleted` });
      } catch {
        return res
          .status(500)
          .json({ data: null, message: `User ${id} deletion failed` });
      }
    })
    .catch(() => {
      return res
        .status(400)
        .json({ data: null, message: "Failed to parse IP" });
    });
};
