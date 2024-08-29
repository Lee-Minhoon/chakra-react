import { Post, User } from "@/apis";

type Session = { [key: string]: number };

interface DB {
  session: Session;
  files: { [key: string]: string };
  users: User[];
  posts: Post[];
}

const defaultDB = {
  session: {},
  files: {},
  users: [],
  posts: [],
};

export const readDB = (): DB => {
  const db = localStorage.getItem("db");
  if (!db) {
    return writeDB(defaultDB);
  }
  return JSON.parse(db);
};

export const writeDB = (next: React.SetStateAction<DB>) => {
  const updated = typeof next === "function" ? next(readDB()) : next;
  localStorage.setItem("db", JSON.stringify(updated));
  return updated;
};

export const uploadDB = async (file: Blob) => {
  const uuid = crypto.randomUUID();
  const db = readDB();
  const url = URL.createObjectURL(file);
  db["files"][uuid] = url;
  writeDB(db);
  return url;
};
