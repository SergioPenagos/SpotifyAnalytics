import {getSession} from 'next-auth/react';
import { followArtist } from '../../lib/spotify';

export default async(req, res) => {
    req.statusCode = 200;
    const {
      token: {accessToken},
    } = await getSession({req});
    await followArtist(accessToken, req.query.artistId);
    const items = {"followed":"ok"}
    res.json(items)
}