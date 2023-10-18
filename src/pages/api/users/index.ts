import { sleep } from "@/utils";
import type { NextApiRequest, NextApiResponse } from "next";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export var users: User[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      const { cursor, limit } = req.query;
      if (cursor && limit) {
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
      }
      return res.status(200).json({ data: users, message: "success" });
    case "POST":
      const { body } = req;
      const { name, email, phone } = body;
      sleep(200);
      if (users.some((user) => user.name === name)) {
        return res
          .status(409)
          .json({ data: null, message: "name already exists" });
      }
      const newUser = {
        id: (users[users.length - 1]?.id ?? 0) + 1,
        name,
        email,
        phone,
      };
      users.push(newUser);
      sleep(200);
      return res.status(200).json({ data: newUser.id, message: "success" });
    default:
      return res.status(405).end();
  }
}

export const getUser = (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id;
  const user = users.find((user) => user.id === Number(id));
  return res.status(200).json({ data: user, message: "success" });
};

export const updateUser = (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id;
  const { body } = req;
  const { name, email, phone } = body;
  users = users.map((user) => {
    if (user.id === Number(id)) {
      return { id: user.id, name, email, phone };
    }
    return user;
  });
  sleep(400);
  return res.status(200).json({ data: id, message: "success" });
};

export const deleteUser = (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id;
  users = users.filter((user) => user.id !== Number(id));
  sleep(400);
  return res.status(200).json({ data: id, message: "success" });
};
