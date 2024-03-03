import { readDB, writeDB } from "../db";
import { Session } from "../types";

export const readSession = async (): Promise<Session> => {
  try {
    const db = await readDB();
    return db.session;
  } catch (err) {
    console.log("Failed to read db.json");
    throw err;
  }
};

export const writeSession = async (session: Session) => {
  try {
    const db = await readDB();
    writeDB({ ...db, session });
  } catch (err) {
    console.log("Failed to write db.json");
    throw err;
  }
};
