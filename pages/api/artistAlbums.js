import { serialize } from "cookie";
import {getSession} from 'next-auth/react';
import {getArtistAlbum} from '../../lib/spotify'

export default async(req, res) => {
  req.statusCode = 200;
  const {
    token: {accessToken},
  } = await getSession({req});
  const response = await getArtistAlbum(accessToken, req.query.artist);
  const items = await response.data;
  res.json(items)
};
