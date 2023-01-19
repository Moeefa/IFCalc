import type { NextApiRequest, NextApiResponse } from 'next'
import mongodb from "../../shared/libs/database";
import Ads from "../../shared/models/Ads";

type Data = {
  success: boolean;
  data?: unknown;
  message?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  await mongodb();
  let ads = await Ads.find({});

  switch (req.method) {
    case "GET":
      if (!ads) return res.json({ success: false, data: null });
      res.json({ success: true, data: ads });
      break;
    default:
      res.status(405).json({ success: false });
      break;
  };
};