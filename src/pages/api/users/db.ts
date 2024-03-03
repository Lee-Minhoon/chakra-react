import { RequiredKeysOf } from "type-fest";
import { readDB, writeDB } from "../db";
import { Order, User } from "../types";

export const readUsers = async (
  sort?: RequiredKeysOf<User>,
  order?: Order,
  search?: string
): Promise<User[]> => {
  try {
    const db = await readDB();
    let users = db.users;
    if (search && search.length > 0) {
      users = users.filter((user) => {
        return (
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase()) ||
          user.phone.toLowerCase().includes(search.toLowerCase())
        );
      });
    }
    if (sort && order) {
      users = users.sort((a, b) => {
        const ac = a[sort];
        const bc = b[sort];
        if (ac > bc) return order === "desc" ? -1 : 1;
        else if (ac < bc) return order === "desc" ? 1 : -1;
        else return 0;
      });
    }
    return users;
  } catch (err) {
    console.log("Failed to read db.json");
    throw err;
  }
};

export const writeUsers = async (users: User[]) => {
  try {
    const db = await readDB();
    await writeDB({ ...db, users });
  } catch (err) {
    console.log("Failed to write db.json");
    throw err;
  }
};
