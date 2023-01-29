import {getSession} from 'next-auth/react';
import {getArtistTopTracks} from '../../lib/spotify'

export default async(req, res) => {
    req.statusCode = 200;
    const {
        token: {accessToken},
      } = await getSession({req});
      const response = await getArtistTopTracks(accessToken, req.query.artist, req.query.country);
      const items = await response.data;
      res.json(items)
}