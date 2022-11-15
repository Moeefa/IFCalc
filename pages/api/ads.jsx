import mongodb from "../../shared/libs/database";
import Ads from "../../shared/models/Ads";

export default async (req, res) => {
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