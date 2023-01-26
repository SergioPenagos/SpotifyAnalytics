import { serialize } from "cookie";
import {getSession} from 'next-auth/react';
import {getUsersTopArtists} from '../../lib/spotify'

export default async(req, res) => {
  req.statusCode = 200;
  const {
    token: {accessToken},
  } = await getSession({req});
  const response = await getUsersTopArtists(accessToken);
  const items = await response.data;
  res.json(items)
};
