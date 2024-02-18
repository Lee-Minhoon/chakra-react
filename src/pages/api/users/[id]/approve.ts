import { NextApiRequest, NextApiResponse } from "next";
import { approveUser } from "..";
import { sleep } from "../../utils";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  sleep(500);
  switch (req.method) {
    case "POST":
      return approveUser(req, res);
  }
}
