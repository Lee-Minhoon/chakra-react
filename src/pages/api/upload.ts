import { NextApiRequest, NextApiResponse } from "next";
import { readUploads } from "./db";
import { uploadFormData } from "./utils";

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
  const uploads = readUploads();

  if (uploads.length > 20) {
    res.status(400).json({ data: null, message: "Already uploaded 20 files" });
  }

  const data = await uploadFormData(req).catch((err) => {
    if (err.code === 1009) {
      res
        .status(400)
        .json({ data: null, message: "File size too large, max 5MB" });
    }
  });

  if (!data) {
    res.status(500).json({ data: null, message: "Failed to upload" });
  }

  res.status(200).json({ data: data?.files, message: "Successfully uploaded" });
};
