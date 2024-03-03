import { NextApiRequest, NextApiResponse } from "next";
import { fileUpload } from "./db";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      return upload(req, res);
    default:
      return res.status(405).end();
  }
}

export const upload = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = await fileUpload(req).catch((err) => {
    if (err.code === 1009) {
      res
        .status(400)
        .json({ data: null, message: "File size too large, max 5MB" });
    }
  });

  if (!data) {
    res.status(500).json({ data: null, message: "Failed to upload" });
  }

  res.status(200).json({ data, message: "Successfully uploaded" });
};
