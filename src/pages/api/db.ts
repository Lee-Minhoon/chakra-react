import AWS from "aws-sdk";
import formidable from "formidable";
import fs from "fs";
import { NextApiRequest } from "next";
import path from "path";
import { Post, Session, User } from "./types";

export const isProd = process.env.NEXT_PUBLIC_VERCEL_ENV === "production";
const dbFileName = "db.json";

// local
const dbDir = path.join(process.cwd(), dbFileName);
const storageDir = "./public/uploads";

// cloud
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

interface DB {
  session: Session;
  users: User[];
  posts: Post[];
}

export const readDB = () => {
  return isProd ? readCloudDB() : readLocalDB();
};

export const writeDB = (db: DB) => {
  return isProd ? writeCloubDB(db) : writeLocalDB(db);
};

export const fileUpload = (req: NextApiRequest) => {
  return isProd ? fileUploadToCloud(req) : fileUploadToLocal(req);
};

const makeJson = (db?: DB) =>
  JSON.stringify(db ?? { session: {}, users: [], posts: [] }, null, 2);

const readLocalDB = () => {
  return new Promise<DB>((resolve, reject) => {
    fs.readFile(dbDir, "utf8", (err, data) => {
      if (err) {
        fs.writeFile(dbDir, makeJson(), "utf8", (err) => {
          if (err) {
            reject(err);
          }
        });
      }
      resolve(JSON.parse(data));
    });
  });
};

const readCloudDB = async (): Promise<DB> => {
  return new Promise<DB>(async (resolve, reject) => {
    cloudStorage
      .getObject({ Bucket: bucket, Key: dbFileName })
      .promise()
      .then(
        (data) => {
          if (!data.Body) {
            reject(new Error("No data"));
            return;
          }
          resolve(JSON.parse(data.Body.toString()));
        },
        (err) => {
          reject(err);
        }
      )
      .catch((err) => {
        reject(err);
      });
  });
};

const writeLocalDB = (db: DB) => {
  return new Promise<void>((resolve, reject) => {
    fs.writeFile(dbDir, makeJson(db), "utf8", (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
};

const writeCloubDB = async (db: DB) => {
  return new Promise<void>(async (resolve, reject) => {
    await cloudStorage
      .putObject({
        Bucket: bucket,
        Key: dbFileName,
        Body: makeJson(db),
      })
      .promise()
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const options: formidable.Options = {
  uploadDir: storageDir,
  maxFileSize: 5 * 1024 * 1024,
  filename: (name, ext, part, form) =>
    `${new Date().getTime()}-${part.originalFilename}`,
};

const fileUploadToLocal = (req: NextApiRequest) => {
  return new Promise<string>((resolve, reject) => {
    fs.readdir(storageDir, (err) => {
      if (err) {
        fs.mkdir(storageDir, (err) => {
          if (err) {
            reject(err);
            return;
          }
        });
      }

      const form = formidable({
        uploadDir: "./public/uploads",
        maxFileSize: 5 * 1024 * 1024,
        filename: (name, ext, part, form) =>
          `${new Date().getTime()}-${part.originalFilename}`,
      });

      form.parse(req, (err, fields, files) => {
        if (err) {
          reject(err);
          return;
        }

        const file = files.file;

        if (!file || file.length === 0) {
          reject(new Error("No file"));
          return;
        }

        resolve(`/uploads/${file[0].newFilename}`);
      });
    });
  });
};

const fileUploadToCloud = (req: NextApiRequest) => {
  return new Promise<string>(async (resolve, reject) => {
    const form = formidable(options);

    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
        return;
      }

      const file = files.file;

      if (!file || file.length === 0) {
        reject(new Error("No file"));
        return;
      }

      const fileKey = `images/${Date.now()}.jpg`;

      fs.readFile(file[0].filepath, (err, data) => {
        if (err) {
          reject(err);
          return;
        }

        cloudStorage
          .putObject({
            Bucket: bucket,
            Key: fileKey,
            ACL: "public-read",
            Body: data,
            ContentType: "image/jpeg",
          })
          .promise()
          .then(() => {
            resolve(`${endpoint.href}${bucket}/${fileKey}`);
          })
          .catch((err) => {
            reject(err);
          });
      });
    });
  });
};
