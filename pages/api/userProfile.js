import { serialize } from "cookie";
import {getSession} from 'next-auth/react';
import {getUsersProfile} from '../../lib/spotify'

export default async(req, res) => {
  req.statusCode = 200;
  const {
    token: {accessToken},
  } = await getSession({req});
  const response = await getUsersProfile(accessToken);
  const items = await response.data;
  res.json(items)
};
