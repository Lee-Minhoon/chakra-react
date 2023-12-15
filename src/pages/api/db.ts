import { Nullable } from "@/types";
import fs from "fs";
import path from "path";

interface Scheme {
  session: Session;
  users: User[];
  posts: Post[];
}

export type Session = Nullable<User>;

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  profile?: string;
  approved: boolean;
}

export interface Post {
  id: number;
  title: string;
  content: string;
}

export type Order = "asc" | "desc";

export const readDB = (): Scheme => {
  const data = fs.readFileSync(path.join(process.cwd(), "/db.json"), "utf8");
  return JSON.parse(data);
};
