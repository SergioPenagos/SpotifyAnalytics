import AltContainer from "../components/AltContainer";
import qs from "qs";
import axios from "axios";
import { user, tracks, artists, following } from "../fixtures/testData";
import UserCard from "../components/UserCard";
import Link from "next/link";
import ArtistCard from "../components/ArtistCard";
import TrackCard from "../components/TrackCard";
import { useState } from "react";

const userData = () => {
  const [userSelection, setUserSelection] = useState("Artists");
  const [selectedArtist, setSelectedArtist] = useState(0);

  const handleSelectorClick = (selection) => {
    setUserSelection(selection);
  };

  console.log(userSelection);

  return (
    <AltContainer>
      <UserCard
        userImage={user.images[0].url}
        userLink={user.external_urls.spotify}
        userName={user.display_name}
        userFollowers={user.followers.total}
        userFollowing={following.total}
      />
      <div className="row" style={{ width: "100%", margin: "20px 20px" }}>
        <div className="col-md-3 col-lg-2">
          <div
            className="row justify-content-center"
            style={{ textAlign: "center" }}
          >
            <h2>Top {userSelection}</h2>
          </div>
          <div className="row" style={{marginBottom:"8px"}}>
            <div
              className="col-md-6"
              style={{
                display: "flex",
                alignItems: "right",
                justifyContent: "right",
              }}
            >
              <Link
                href="#"
                onClick={() => handleSelectorClick("Artists")}
                style={{ textDecoration: "none", color: "black", width: "70%" }}
              >
                <div
                  style={{
                    width: "100%",
                    background: "#A6E664",
                    borderRadius: "15px",
                    textAlign: "center",
                    opacity: userSelection == "Artists" ? 1 : 0.6,
                    color: "white"
                  }}
                >
                  Artists
                </div>
              </Link>
            </div>
            <div
              className="col-md-6"
              style={{
                display: "flex",
                alignItems: "left",
                justifyContent: "left",
              }}
            >
              <Link
                href="#"
                onClick={() => handleSelectorClick("Tracks")}
                style={{ textDecoration: "none", color: "black", width: "70%" }}
              >
                <div
                  style={{
                    width: "100%",
                    background: "#A6E664",
                    borderRadius: "15px",
                    textAlign: "center",
                    opacity: userSelection == "Tracks" ? 1 : 0.6,
                    color: "white"
                  }}
                >
                  Tracks
                </div>
              </Link>
            </div>
          </div>
          <div
            className="row artists"
            style={{ overflow: "scroll", height: "60vh" }}
          >
            {userSelection=="Artists" ? artists.items.map((artist, index) => {
              return (
                <ArtistCard
                  artistUrl={artist.external_urls.spotify}
                  artistImage={artist.images[0].url}
                  artistName={artist.name}
                  artistFollowers={artist.followers.total}
                />
              );
            }):tracks.items.map((track, index) => {
              return (
                <TrackCard
                  trackImage={track.album.images[0].url}
                  trackUrl={track.external_urls.spotify}
                  trackName={track.name}
                  artistUrl={track.artists[0].external_urls.spotify}
                  artistName={track.artists[0].name}
                  duration={track.duration_ms}
                />
              );
            })}
          </div>
        </div>
        <div className="col-md-9 col-lg-10">
          <div className="row" style={{display:"flex", textAlign:"center", paddingLeft:"10px"}}> Hello</div>
        </div>
      </div>
    </AltContainer>
  );
};

/* userData.getInitialProps = async (ctx) => {
  const body = {
    grant_type: "authorization_code",
    code: ctx.query.code,
    redirect_uri: "http://localhost:3000/user_data",
  };
  const tokenOptions = {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic MTk0NzFmYTRhZTIzNDVmNjkzODU2ODA5NmMyNmJkNTM6MGVmZjdjZjFiM2EzNDljZmJhZmVmM2E0NDRhMzQzMDQ=",
    },
    data: qs.stringify(body),
    url: "https://accounts.spotify.com/api/token",
  };
  const tokens = await axios(tokenOptions);
  const userProfileOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokens.data.access_token}`,
    },
    url: "https://api.spotify.com/v1/me",
  };
  const userProfile = await axios(userProfileOptions);
  const userTopArtistsOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokens.data.access_token}`,
    },
    params: {"time_range":"long_term"},
    url: "https://api.spotify.com/v1/me/top/artists",
  };
  const topArtists = await axios(userTopArtistsOptions)
  const userTopTracksOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokens.data.access_token}`,
    },
    params: {"time_range":"long_term"},
    url: "https://api.spotify.com/v1/me/top/tracks",
  };
  const topTracks = await axios(userTopTracksOptions)
  const userFollowingOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokens.data.access_token}`,
    },
    params: {"type":"artist"},
    url: "https://api.spotify.com/v1/me/following",
  };
  const userFollowing = await axios(userFollowingOptions)
  return {
    user: userProfile.data,
    auth: tokens.data,
    artists: topArtists.data,
    tracks: topTracks.data, 
    following: userFollowing.data
  };
};  */

export default userData;
