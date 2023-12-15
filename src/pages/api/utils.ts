import formidable from "formidable";
import fs from "fs/promises";
import { NextApiRequest } from "next";

export const sleep = (ms: number) => {
  const wakeUpTime = Date.now() + ms;
  while (Date.now() < wakeUpTime) {}
};

const uploadDir = "./public/uploads";

export const uploadFormData = (req: NextApiRequest) => {
  return new Promise<{
    fields: formidable.Fields<string>;
    files: formidable.Files;
  }>(async (resolve, reject) => {
    await fs.readdir(uploadDir).catch(() => {
      fs.mkdir(uploadDir).catch(() => {
        reject();
      });
    });

    const form = formidable({
      uploadDir,
      filename: (name, ext, part, form) =>
        `${new Date().getTime()}-${part.originalFilename}`,
    });

    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
      }
      resolve({ fields, files });
    });
  });
};
