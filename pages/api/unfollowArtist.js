import {getSession} from 'next-auth/react';
import { unfollowArtist } from '../../lib/spotify';

export default async(req, res) => {
    req.statusCode = 200;
    const {
      token: {accessToken},
    } = await getSession({req});
    await unfollowArtist(accessToken, req.query.artistId);
    const items = {"unfollowed":"ok"}
    res.json(items)
}