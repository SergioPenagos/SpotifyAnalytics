import { serialize } from "cookie";
import {getSession} from 'next-auth/react';

export default async(req, res) => {
  req.statusCode = 200;
  const {
    token: {accessToken},
  } = await getSession({req});
  res.json({response:"ok", token:accessToken})
};
