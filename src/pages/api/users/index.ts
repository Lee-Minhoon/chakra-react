import { sleep } from "@/utils";
import type { NextApiRequest, NextApiResponse } from "next";

export var users: { id: number; name: string }[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      return res.status(200).json({ data: users, message: "success" });
    case "POST":
      const { body } = req;
      const { name } = body;
      sleep(500);
      if (users.some((user) => user.name === name)) {
        return res
          .status(409)
          .json({ data: null, message: "name already exists" });
      }
      const newUser = { id: (users[users.length - 1]?.id ?? 0) + 1, name };
      users.push(newUser);
      sleep(500);
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
  const { name } = body;
  users = users.map((user) => {
    if (user.id === Number(id)) {
      return { id: user.id, name };
    }
    return user;
  });
  sleep(1000);
  return res.status(200).json({ data: id, message: "success" });
};

export const deleteUser = (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id;
  users = users.filter((user) => user.id !== Number(id));
  sleep(1000);
  return res.status(200).json({ data: id, message: "success" });
};
