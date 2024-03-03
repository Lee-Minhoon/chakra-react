import { Nullable } from "@/types";
import fs from "fs";
import path from "path";

interface DB {
  session: Session;
  users: User[];
  posts: Post[];
}

export type ID = number;

export type Session = Nullable<ID>;

export interface Scheme {
  id: ID;
  createdAt: string;
  updatedAt: string;
}

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
  let data: string;
  try {
    data = fs.readFileSync(path.join(process.cwd(), "/db.json"), "utf8");
  } catch (err) {
    try {
      fs.writeFileSync(
        path.join(process.cwd(), "/db.json"),
        JSON.stringify({ session: null, users: [], posts: [] }, null, 2),
        "utf8"
      );
    } catch (err) {
      throw err;
    }
    data = fs.readFileSync(path.join(process.cwd(), "/db.json"), "utf8");
  }
  return JSON.parse(data);
};

export const readUploads = () => {
  return fs.readdirSync("./public/uploads");
};
