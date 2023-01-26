import axios from "axios";

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/playlists";
const USER_PROFILE_ENDPOINT = "https://api.spotify.com/v1/me";
const TOP_ARTISTS_ENDPOINT = "https://api.spotify.com/v1/me/top/artists";
const TOP_TRACKS_ENDPOINT = "https://api.spotify.com/v1/me/top/tracks";
const USER_FOLLOWING_ENDPOINT = "https://api.spotify.com/v1/me/following";
const ARTIST_ENDPOINT = "https://api.spotify.com/v1/artists/";

const getAccessToken = async (refresh_token) => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token,
    }),
  });

  return response.json();
};

export const getUsersPlaylists = async (refresh_token) => {
  const { access_token } = await getAccessToken(refresh_token);
  return fetch(PLAYLISTS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const getUsersProfile = async (refresh_token) => {
  const { access_token } = await getAccessToken(refresh_token);
  const userProfileOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    url: USER_PROFILE_ENDPOINT,
  };
  const userProfile = await axios(userProfileOptions);
  return userProfile;
};

export const getUsersTopArtists = async (refresh_token) => {
  const { access_token } = await getAccessToken(refresh_token);
  const userArtistsOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    params: { time_range: "long_term" },
    url: TOP_ARTISTS_ENDPOINT,
  };
  const userArtists = await axios(userArtistsOptions);
  return userArtists;
};

export const getUsersTopTracks = async (refresh_token) => {
  const { access_token } = await getAccessToken(refresh_token);
  const userTracksOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    params: { time_range: "long_term" },
    url: TOP_TRACKS_ENDPOINT,
  };
  const userTracks = await axios(userTracksOptions);
  return userTracks;
};

export const getUsersFollowing = async (refresh_token) => {
    const { access_token } = await getAccessToken(refresh_token);
    const userFollowingOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      params: { type: "artist" },
      url: USER_FOLLOWING_ENDPOINT,
    };
    const userFollowing = await axios(userFollowingOptions);
    return userFollowing;
  };

  export const getArtistAlbum = async (refresh_token, artistId) => {
    const { access_token } = await getAccessToken(refresh_token);
    const artistAlbumsOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      url: ARTIST_ENDPOINT+`${artistId}/albums`,
    };
    const artistAlbums = await axios(artistAlbumsOptions);
    return artistAlbums;
  };