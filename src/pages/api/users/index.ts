import type { NextApiRequest, NextApiResponse } from "next";

export var users: { id: number; name: string }[] = [];

export const sleep = () => {
  const wakeUpTime = Date.now() + 1000;
  while (Date.now() < wakeUpTime) {}
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      return res.status(200).json({ data: users, message: "success" });
    case "POST":
      const { body } = req;
      const { name } = body;
      const newUser = { id: (users[users.length - 1]?.id ?? 0) + 1, name };
      users.push(newUser);
      sleep();
      return res.status(200).json({ data: newUser.id, message: "success" });
    default:
      return res.status(405).end();
  }
}

export const getUesr = (req: NextApiRequest, res: NextApiResponse) => {
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
  sleep();
  return res.status(200).json({ data: id, message: "success" });
};

export const deleteUser = (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id;
  users = users.filter((user) => user.id !== Number(id));
  sleep();
  return res.status(200).json({ data: id, message: "success" });
};
