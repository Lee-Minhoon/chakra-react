import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { Order, User, readDB } from "../db";
import { sleep } from "../utils";

export const readUsers = (sort?: keyof User, order?: Order): User[] => {
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
    console.log("failed to read db.json");
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
    console.log("failed to write db.json");
    throw err;
  }
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  sleep(200);
  switch (req.method) {
    case "GET":
      const { offset, cursor, limit } = req.query;
      if (offset && limit) return getUsersByOffset(req, res);
      if (cursor && limit) return getUsersByCursor(req, res);
      return getUsers(req, res);
    case "POST":
      return postUser(req, res);
    default:
      return res.status(405).end();
  }
}

export const getUser = (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    const users = readUsers();
    const user = users.find((user) => user.id === Number(id));
    return res.status(200).json({ data: user, message: "success" });
  } catch {
    return res.status(500).json({ data: null, message: "failed" });
  }
};

export const getUsers = (req: NextApiRequest, res: NextApiResponse) => {
  const { sort, order } = req.query;

  try {
    const users = readUsers(sort as keyof User, order as Order);
    return res.status(200).json({ data: users, message: "success" });
  } catch {
    return res.status(500).json({ data: null, message: "failed" });
  }
};

export const getUsersByOffset = (req: NextApiRequest, res: NextApiResponse) => {
  const { offset, limit, sort, order } = req.query;

  try {
    const users = readUsers(sort as keyof User, order as Order);
    const slicedUsers = users.slice(
      Number(offset),
      Number(offset) + Number(limit)
    );

    return res.status(200).json({
      data: { total: users.length, data: slicedUsers },
      message: "success",
    });
  } catch {
    return res.status(500).json({ data: null, message: "failed" });
  }
};

export const getUsersByCursor = (req: NextApiRequest, res: NextApiResponse) => {
  const { cursor, limit } = req.query;

  try {
    const users = readUsers();
    const index = users.findIndex((user) => user.id === Number(cursor));
    const slicedUsers = users.slice(index, index + Number(limit));

    return res.status(200).json({
      data: {
        previous: users[index - Number(limit)]?.id ?? null,
        next: users[index + Number(limit)]?.id ?? null,
        data: slicedUsers,
      },
      message: "success",
    });
  } catch {
    return res.status(500).json({ data: null, message: "failed" });
  }
};

export const postUser = (req: NextApiRequest, res: NextApiResponse) => {
  const { name, email, phone } = req.body;

  try {
    const users = readUsers();
    if (users.some((user) => user.email === email)) {
      return res
        .status(409)
        .json({ data: null, message: "email already exists" });
    }

    const newUser: User = {
      id: (users[users.length - 1]?.id ?? 0) + 1,
      name,
      email,
      phone,
      approved: false,
    };
    users.push(newUser);

    try {
      writeUsers(users);
    } catch {
      return res.status(500).json({ data: null, message: "failed" });
    }

    return res.status(200).json({ data: newUser.id, message: "success" });
  } catch {
    return res.status(500).json({ data: null, message: "failed" });
  }
};

export const updateUser = (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const { name, email, phone } = req.body;

  try {
    let users = readUsers();
    users = users.map((user) => {
      if (user.id === Number(id)) {
        return { ...user, name, email, phone };
      }
      return user;
    });

    try {
      writeUsers(users);
    } catch {
      return res.status(500).json({ data: null, message: "failed" });
    }

    return res.status(200).json({ data: id, message: "success" });
  } catch {
    return res.status(500).json({ data: null, message: "failed" });
  }
};

export const deleteUser = (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    let users = readUsers();
    users = users.filter((user) => user.id !== Number(id));

    try {
      writeUsers(users);
    } catch {
      return res.status(500).json({ data: null, message: "failed" });
    }

    return res.status(200).json({ data: id, message: "success" });
  } catch {
    return res.status(500).json({ data: null, message: "failed" });
  }
};

export const approveUser = (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    let users = readUsers();
    users = users.map((user) => {
      if (user.id === Number(id)) {
        return { ...user, approved: true };
      }
      return user;
    });

    try {
      writeUsers(users);
    } catch {
      return res.status(500).json({ data: null, message: "failed" });
    }

    return res.status(200).json({ data: id, message: "success" });
  } catch {
    return res.status(500).json({ data: null, message: "failed" });
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
        name: `user-${currentId}`,
        email: `user-${currentId}@gmail.com`,
        phone: `010-0000-0000`,
        approved: Math.random() > 0.5,
      });
    }

    try {
      writeUsers(users);
    } catch {
      return res.status(500).json({ data: null, message: "failed" });
    }

    return res.status(200).json({ data: users, message: "success" });
  } catch {
    return res.status(500).json({ data: null, message: "failed" });
  }
};

export const resetTestUsers = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    writeUsers([]);
  } catch {
    return res.status(500).json({ data: null, message: "failed" });
  }

  return res.status(200).json({ data: [], message: "success" });
};
