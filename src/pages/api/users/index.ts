import { RequiredKeys } from "@/types";
import { getRandomEmail, getRandomPhoneNumber, getRandomString } from "@/utils";
import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { Order, User, readDB } from "../db";
import { sleep } from "../utils";

export const readUsers = (sort?: RequiredKeys<User>, order?: Order): User[] => {
  try {
    const db = readDB();
    if (sort && order) {
      return db.users.sort((a, b) => {
        if (order === "asc") {
          if (a[sort] < b[sort]) return -1;
          if (a[sort] > b[sort]) return 1;
        } else {
          if (a[sort] > b[sort]) return -1;
          if (a[sort] < b[sort]) return 1;
        }
        return 0;
      });
    }
    return db.users;
  } catch (err) {
    console.log("Failed to read db.json");
    throw err;
  }
};

export const writeUsers = (users: User[]) => {
  try {
    const db = readDB();
    fs.writeFileSync(
      path.join(process.cwd(), "/db.json"),
      JSON.stringify({ ...db, users }, null, 2),
      "utf8"
    );
  } catch (err) {
    console.log("Failed to write db.json");
    throw err;
  }
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  sleep(500);
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

export const getUser = (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    const users = readUsers();
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

export const getUsers = (req: NextApiRequest, res: NextApiResponse) => {
  const { sort, order } = req.query;

  try {
    const users = readUsers(sort as RequiredKeys<User>, order as Order);

    return res
      .status(200)
      .json({ data: users, message: "Successfully retrieved users" });
  } catch {
    return res.status(500).json({ data: null, message: "Failed to get users" });
  }
};

export const getUsersByPage = (req: NextApiRequest, res: NextApiResponse) => {
  const { page, limit, sort, order } = req.query;

  const offset = (Number(page) - 1) * Number(limit);

  try {
    const users = readUsers(sort as RequiredKeys<User>, order as Order);
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

export const getUsersByCursor = (req: NextApiRequest, res: NextApiResponse) => {
  const { cursor, limit, sort, order } = req.query;

  try {
    const users = readUsers(sort as RequiredKeys<User>, order as Order);
    const index = users.findIndex((_, idx) => idx === Number(cursor));
    const slicedUsers = users.slice(index, index + Number(limit));

    return res.status(200).json({
      data: {
        previous: index - Number(limit) >= 0 ? index - Number(limit) : null,
        next:
          index + Number(limit) < users.length ? index + Number(limit) : null,
        data: slicedUsers,
      },
      message: "Successfully retrieved users",
    });
  } catch {
    return res.status(500).json({ data: null, message: "Failed to get users" });
  }
};

export const createUser = (req: NextApiRequest, res: NextApiResponse) => {
  const { name, email, phone, profile } = req.body;

  try {
    const users = readUsers();
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

    writeUsers(users);

    return res
      .status(200)
      .json({ data: newUser.id, message: `User ${newUser.id} created` });
  } catch {
    return res
      .status(500)
      .json({ data: null, message: `User ${name} creation failed` });
  }
};

export const updateUser = (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const { name, email, phone, profile } = req.body;

  try {
    let users = readUsers();
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

    writeUsers(users);

    return res.status(200).json({ data: id, message: `User ${id} updated` });
  } catch {
    return res
      .status(500)
      .json({ data: null, message: `User ${id} update failed` });
  }
};

export const deleteUser = (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    let users = readUsers();
    users = users.filter((user) => user.id !== Number(id));

    writeUsers(users);

    return res.status(200).json({ data: id, message: `User ${id} deleted` });
  } catch {
    return res
      .status(500)
      .json({ data: null, message: `User ${id} deletion failed` });
  }
};

export const approveUser = (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    let users = readUsers();
    users = users.map((user) => {
      if (user.id === Number(id)) {
        return { ...user, approved: true, updatedAt: new Date().toISOString() };
      }
      return user;
    });

    writeUsers(users);

    return res.status(200).json({ data: id, message: `User ${id} approved` });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ data: null, message: `User ${id} approval failed` });
  }
};

export const createTestUsers = (req: NextApiRequest, res: NextApiResponse) => {
  const { count } = req.query;

  try {
    const users = readUsers();
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

    writeUsers(users);

    return res
      .status(200)
      .json({ data: users, message: "Successfully created test users" });
  } catch {
    return res
      .status(500)
      .json({ data: null, message: "Failed to create test users" });
  }
};

export const resetTestUsers = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    writeUsers([]);

    return res
      .status(200)
      .json({ data: [], message: "Successfully reset test users" });
  } catch {
    return res
      .status(500)
      .json({ data: null, message: "Failed to reset test users" });
  }
};
