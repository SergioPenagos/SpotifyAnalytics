import { getSession } from "next-auth/react";
import { tracksAudioFeatures } from "../../lib/spotify";

export default async (req, res) => {
  req.statusCode = 200;
  const {
    token: { accessToken },
  } = await getSession({ req });
  const response = await tracksAudioFeatures(accessToken, req.query.ids);
  const items = await response.data;
  res.json(items);
};
