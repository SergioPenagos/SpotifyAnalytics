import { serialize } from "cookie";
import {getSession} from 'next-auth/react';
import {getUsersTopTracks} from '../../lib/spotify'

export default async(req, res) => {
  req.statusCode = 200;
  const {
    token: {accessToken},
  } = await getSession({req});
  const response = await getUsersTopTracks(accessToken);
  const items = await response.data;
  res.json(items)
};
