import { NextApiRequest, NextApiResponse } from "next";
import { sleep, uploadFormData } from "./utils";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  sleep(200);
  switch (req.method) {
    case "POST":
      return upload(req, res);
    default:
      return res.status(405).end();
  }
}

export const upload = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = await uploadFormData(req).catch(() => null);

  if (!data) {
    res.status(500).json({ data: null, message: "failed" });
  }

  res.status(200).json({ data: data?.files, message: "success" });
};
