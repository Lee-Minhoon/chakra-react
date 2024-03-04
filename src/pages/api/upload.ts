import { NextApiRequest, NextApiResponse } from "next";
import { fileUpload } from "./db";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      return upload(req, res);
    default:
      return res.status(405).end();
  }
}

export const upload = async (req: NextApiRequest, res: NextApiResponse) => {
  await fileUpload(req)
    .then((data) => {
      res.status(200).json({ data, message: "Successfully uploaded" });
    })
    .catch((err) => {
      if (err.code === 1009) {
        res
          .status(400)
          .json({ data: null, message: "File size too large, max 5MB" });
      }
    });
};
