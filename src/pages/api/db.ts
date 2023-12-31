import { Nullable } from "@/types";
import fs from "fs";
import path from "path";

interface DB {
  session: Session;
  users: User[];
  posts: Post[];
}

export type ID = number;

export interface Scheme {
  id: ID;
  createdAt: string;
  updatedAt: string;
}

export type Session = Nullable<User>;

export interface User extends Scheme {
  name: string;
  email: string;
  phone: string;
  profile?: string;
  approved: boolean;
}

export interface Post extends Scheme {
  userId: number;
  title: string;
  content: string;
}

export type Order = "asc" | "desc";

export const readDB = (): DB => {
  const data = fs.readFileSync(path.join(process.cwd(), "/db.json"), "utf8");
  return JSON.parse(data);
};
