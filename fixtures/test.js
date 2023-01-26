const userProfileOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${ctx.query.token}`,
    },
    url: "https://api.spotify.com/v1/me",
  };
  const userProfile = await axios(userProfileOptions);
  const userTopArtistsOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${ctx.query.token}`,
    },
    params: { time_range: "long_term" },
    url: "https://api.spotify.com/v1/me/top/artists",
  };
  const topArtists = await axios(userTopArtistsOptions);
  const userTopTracksOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${ctx.query.token}`,
    },
    params: { time_range: "long_term" },
    url: "https://api.spotify.com/v1/me/top/tracks",
  };
  const topTracks = await axios(userTopTracksOptions);
  const userFollowingOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${ctx.query.token}`,
    },
    params: { type: "artist" },
    url: "https://api.spotify.com/v1/me/following",
  };
  const userFollowing = await axios(userFollowingOptions);
  const firstArtistAlbumsOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${ctx.query.token}`,
    },
    url: `https://api.spotify.com/v1/artists/${topArtists.data.items[0].id}/albums`,
  };
  const artistAlbums = await axios(firstArtistAlbumsOptions);