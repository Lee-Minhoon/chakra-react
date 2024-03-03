import fs from "fs";
import path from "path";
import { Session, readDB } from "../db";

export const readSession = (): Session => {
  try {
    const db = readDB();
    return db.session;
  } catch (err) {
    console.log("Failed to read db.json");
    throw err;
  }
};

export const writeSession = (session: Session) => {
  try {
    const db = readDB();
    fs.writeFileSync(
      path.join(process.cwd(), "/db.json"),
      JSON.stringify({ ...db, session }, null, 2),
      "utf8"
    );
  } catch (err) {
    console.log("Failed to write db.json");
    throw err;
  }
};
