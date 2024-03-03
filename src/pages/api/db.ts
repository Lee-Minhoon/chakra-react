import { Nullable } from "@/types";
import AWS from "aws-sdk";
import formidable from "formidable";
import fs from "fs";
import fsPromises from "fs/promises";
import { NextApiRequest } from "next";
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

const uploadDir = "./public/uploads";
const bucket = "nextjs-boilerplate";
const endpoint = new AWS.Endpoint("https://kr.object.ncloudstorage.com");
const cloudStorage = new AWS.S3({
  region: "kr-standard",
  endpoint: endpoint,
  credentials: {
    accessKeyId: process.env.NCLOUD_ACCESS_KEY!,
    secretAccessKey: process.env.NCLOUD_SECRET_KEY!,
  },
});

// const isProd = process.env.NEXT_PUBLIC_VERCEL_ENV === "production";
const isProd = true;

export const readDB = async (): Promise<DB> => {
  if (isProd) {
    return await readCloudDB();
  }
  return readLocalDB();
};

export const writeDB = async (
  session: Session,
  users: User[],
  posts: Post[]
) => {
  if (isProd) {
    await writeCloubDB(session, users, posts);
  }
  writeLocalDB(session, users, posts);
};

const readLocalDB = (): DB => {
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

const readCloudDB = async (): Promise<DB> => {
  const db = await cloudStorage
    .getObject({
      Bucket: bucket,
      Key: "db.json",
    })
    .promise()
    .then((data) => {
      if (!data.Body) {
        throw "No data";
      }

      return JSON.parse(data.Body.toString());
    })
    .catch((err) => {
      throw err;
    });

  return db;
};

const writeLocalDB = (session: Session, users: User[], posts: Post[]) => {
  try {
    fs.writeFileSync(
      path.join(process.cwd(), "/db.json"),
      JSON.stringify({ session, users, posts }, null, 2),
      "utf8"
    );
  } catch (err) {
    throw err;
  }
};

const writeCloubDB = async (session: Session, users: User[], posts: Post[]) => {
  try {
    await cloudStorage
      .putObject({
        Bucket: bucket,
        Key: "db.json",
        Body: JSON.stringify({ session, users, posts }),
      })
      .promise();
  } catch (err) {
    throw err;
  }
};

export const fileUpload = (req: NextApiRequest) => {
  if (isProd) {
    return fileUploadToCloud(req);
  }
  return fileUploadToLocal(req);
};

const fileUploadToCloud = (req: NextApiRequest) => {
  return new Promise<string>(async (resolve, reject) => {
    const form = formidable({
      uploadDir,
      maxFileSize: 5 * 1024 * 1024,
      filename: (name, ext, part, form) =>
        `${new Date().getTime()}-${part.originalFilename}`,
    });

    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
      }

      const file = files.file;

      if (!file || file.length === 0) {
        reject("No file");
        return;
      }

      const fileKey = `images/${Date.now()}.jpg`;

      fsPromises
        .readFile(file[0].filepath)
        .then((buffer) => {
          cloudStorage
            .putObject({
              Bucket: bucket,
              Key: fileKey,
              ACL: "public-read",
              Body: buffer,
              ContentType: "image/jpeg",
            })
            .promise()
            .then(() => {
              resolve(`${endpoint.href}${bucket}/${fileKey}`);
            })
            .catch((err) => {
              reject(err);
            });
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
};

const fileUploadToLocal = (req: NextApiRequest) => {
  return new Promise<string>(async (resolve, reject) => {
    await fsPromises.readdir(uploadDir).catch(() => {
      fsPromises.mkdir(uploadDir).catch(() => {
        reject();
      });
    });

    const form = formidable({
      uploadDir,
      maxFileSize: 5 * 1024 * 1024,
      filename: (name, ext, part, form) =>
        `${new Date().getTime()}-${part.originalFilename}`,
    });

    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
      }

      if (!files.file || files.file.length === 0) {
        reject("No file");
        return;
      }

      resolve(`uploads/${files.file[0].newFilename}`);
    });
  });
};
