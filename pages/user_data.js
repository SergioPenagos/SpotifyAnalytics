import AltContainer from "../components/AltContainer";
import qs from "qs";
import axios from "axios";
import { user, tracks, artists, following } from "../fixtures/testData";
import UserCard from "../components/UserCard";
import Link from "next/link";
import React from "react";
import ReactDOM from "react-dom";
import ArtistCard from "../components/ArtistCard";

function FadeInSection(props) {
  const [isVisible, setVisible] = React.useState(false);
  const domRef = React.useRef();
  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => setVisible(entry.isIntersecting));
    });
    observer.observe(domRef.current);
  }, []);
  return (
    <div
      className={`fade-in-section ${isVisible ? "is-visible" : ""}`}
      ref={domRef}
    >
      {props.children}
    </div>
  );
}

const userData = () => {
  console.log(following);
  return (
    <AltContainer>
      <UserCard
        userImage={user.images[0].url}
        userLink={user.external_urls.spotify}
        userName={user.display_name}
        userFollowers={user.followers.total}
        userFollowing={following.total}
      />
      <div className="row" style={{ width: "100%", margin: "20px 10px" }}>
        <div className="col-md-4 col-lg-2">
          <div
            className="row justify-content-center"
            style={{ textAlign: "center" }}
          >
            <h2>Top Artists</h2>
          </div>
          <div
            className="row artists"
            style={{ overflow: "scroll", height: "60vh" }}
          >
            {artists.items.map((artist) => {
              return (
                <ArtistCard
                  artistUrl={artist.external_urls.spotify}
                  artistImage={artist.images[0].url}
                  artistName={artist.name}
                  artistFollowers={artist.followers.total}
                />
              );
            })}
          </div>
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
