import { NextApiRequest, NextApiResponse } from "next";
import { RequiredKeysOf } from "type-fest";
import { Order, User } from "../types";
import { delayForDev } from "../utils";
import { readUsers, writeUsers } from "./db";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  delayForDev(500);
  switch (req.method) {
    case "GET":
      const { page, cursor, limit } = req.query;
      if (page && limit) return getUsersByPage(req, res);
      if (cursor && limit) return getUsersByCursor(req, res);
      return getUsers(req, res);
    case "POST":
      return createUser(req, res);
    default:
      return res.status(405).end();
  }
}

// [GET] /api/users
const getUsers = async (req: NextApiRequest, res: NextApiResponse) => {
  const { sort, order } = req.query;

  try {
    const users = await readUsers(sort as RequiredKeysOf<User>, order as Order);

    return res
      .status(200)
      .json({ data: users, message: "Successfully retrieved users" });
  } catch {
    return res.status(500).json({ data: null, message: "Failed to get users" });
  }
};

// [GET] /api/users
const getUsersByPage = async (req: NextApiRequest, res: NextApiResponse) => {
  const { page, limit, sort, order, search } = req.query;

  const offset = (Number(page) - 1) * Number(limit);

  try {
    const users = await readUsers(
      sort as RequiredKeysOf<User>,
      order as Order,
      search as string
    );
    const slicedUsers = users.slice(
      Number(offset),
      Number(offset) + Number(limit)
    );

    return res.status(200).json({
      data: { total: users.length, data: slicedUsers },
      message: "Successfully retrieved users",
    });
  } catch {
    return res.status(500).json({ data: null, message: "Failed to get users" });
  }
};

// [GET] /api/users
const getUsersByCursor = async (req: NextApiRequest, res: NextApiResponse) => {
  const { cursor, limit, sort, order, search } = req.query;

  try {
    const users = await readUsers(
      sort as RequiredKeysOf<User>,
      order as Order,
      search as string
    );
    const index = users.findIndex((_, idx) => idx === Number(cursor));
    const slicedUsers = users.slice(index, index + Number(limit));

    const previous = index - Number(limit);
    const next = index + Number(limit);

    return res.status(200).json({
      data: {
        previous: previous >= 0 ? previous : null,
        next: next < users.length ? next : null,
        data: slicedUsers,
      },
      message: "Successfully retrieved users",
    });
  } catch {
    return res.status(500).json({ data: null, message: "Failed to get users" });
  }
};

// [POST] /api/users
const createUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, email, phone, profile } = req.body;

  try {
    const users = await readUsers();

    if (users.length > 999) {
      return res
        .status(409)
        .json({ data: null, message: "Maximum number of users reached" });
    }

    if (users.some((user) => user.email === email)) {
      return res
        .status(409)
        .json({ data: null, message: "Email already exists" });
    }

    const newUser: User = {
      id: (users[users.length - 1]?.id ?? 0) + 1,
      name,
      email,
      phone,
      profile,
      approved: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    users.push(newUser);

    await writeUsers(users);

    return res
      .status(200)
      .json({ data: newUser.id, message: `User ${newUser.id} created` });
  } catch {
    return res
      .status(500)
      .json({ data: null, message: `User ${name} creation failed` });
  }
};
