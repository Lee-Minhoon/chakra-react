import fs from "fs";
import path from "path";

interface Scheme {
  session: User;
  users: User[];
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  approved: boolean;
}

export const readDB = (): Scheme => {
  const data = fs.readFileSync(path.join(process.cwd(), "/db.json"), "utf8");
  return JSON.parse(data);
};
