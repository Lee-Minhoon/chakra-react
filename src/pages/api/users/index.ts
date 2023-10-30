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
  const user = users.find((user) => user.id === Number(id));
  return res.status(200).json({ data: user, message: "success" });
};

export const getUsers = (req: NextApiRequest, res: NextApiResponse) => {
  return res.status(200).json({ data: users, message: "success" });
};

export const getUsersByOffset = (req: NextApiRequest, res: NextApiResponse) => {
  const { offset, limit } = req.query;
  const slicedUsers = users.slice(
    Number(offset),
    Number(offset) + Number(limit)
  );
  return res.status(200).json({
    data: { total: users.length, data: slicedUsers },
    message: "success",
  });
};

export const getUsersByCursor = (req: NextApiRequest, res: NextApiResponse) => {
  const { cursor, limit } = req.query;
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
};

export const postUser = (req: NextApiRequest, res: NextApiResponse) => {
  const { name, email, phone } = req.body;
  if (users.some((user) => user.name === name)) {
    return res.status(409).json({ data: null, message: "name already exists" });
  }
  const newUser = {
    id: (users[users.length - 1]?.id ?? 0) + 1,
    name,
    email,
    phone,
  };
  users.push(newUser);
  return res.status(200).json({ data: newUser.id, message: "success" });
};

export const updateUser = (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const { name, email, phone } = req.body;
  users = users.map((user) => {
    if (user.id === Number(id)) {
      return { id: user.id, name, email, phone };
    }
    return user;
  });
  return res.status(200).json({ data: id, message: "success" });
};

export const deleteUser = (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  users = users.filter((user) => user.id !== Number(id));
  return res.status(200).json({ data: id, message: "success" });
};

export const createTestUsers = (req: NextApiRequest, res: NextApiResponse) => {
  const { count } = req.query;
  const lastId = users[users.length - 1]?.id ?? 0;
  for (let i = 0; i < +(count ?? 10); i++) {
    const currentId = lastId + i + 1;
    users.push({
      id: currentId,
      name: `user-${currentId}`,
      email: `user-${currentId}@gmail.com`,
      phone: `010-0000-0000`,
    });
  }
  return res.status(200).json({ data: users, message: "success" });
};

export const resetTestUsers = (req: NextApiRequest, res: NextApiResponse) => {
  users = [];
  return res.status(200).json({ data: users, message: "success" });
};
