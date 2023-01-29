import {getSession} from 'next-auth/react';
import {getIsUserFollowing} from '../../lib/spotify'

export default async(req, res) => {
    req.statusCode = 200
    const {
        token: {accessToken},
      } = await getSession({req});
      const response = await getIsUserFollowing(accessToken, req.query.artist);
      const items = await response.data;
      res.json(items)

}