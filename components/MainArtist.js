import Link from "next/link";
import axios from "axios";
import { useState, useEffect } from "react";

const followSVG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      fill="currentColor"
      class="bi bi-plus"
      viewBox="0 0 16 16"
    >
      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />{" "}
    </svg>
  );
};

const unfollowSVG = () => {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 10C5 9.44772 5.44772 9 6 9L14 9C14.5523 9 15 9.44772 15 10C15 10.5523 14.5523 11 14 11L6 11C5.44772 11 5 10.5523 5 10Z"
        fill="#fff"
      />
    </svg>
  );
};

const followText = () => {
  return <p style={{color:"black", paddingTop:"2px"}}>Follow</p>;
};

const unfollowText = () => {
  return <p style={{color:"white", paddingTop:"2px"}}>Unfollow</p>;
};

const MainArtist = (props) => {
  const [nowFollowing, setNowFollowing] = useState(props.isArtistFollowed);
  const [toShow, setToShow] = useState(props.isArtistFollowed?unfollowSVG:followSVG);
  const followArtist = async (artistId) => {
    const userIsFollowingOptions = {
      method: "GET",
      params: {
        artistId: artistId,
      },
      url: `/api/followArtist`,
    };
    const userIsFollowing = await axios(userIsFollowingOptions);
    setNowFollowing(true);
  };
  const unfollowArtist = async (artistId) => {
    const userIsFollowingOptions = {
      method: "GET",
      params: {
        artistId: artistId,
      },
      url: `/api/unfollowArtist`,
    };
    const userIsFollowing = await axios(userIsFollowingOptions);
    setNowFollowing(false);
  };
  const onMouseOver = (e) => {
    setTimeout(() => { setToShow(nowFollowing?unfollowText:followText) }, 300)
  };
  const onMouseOut = (e) => {
    setToShow(nowFollowing?unfollowSVG:followSVG);
  };
  return (
    <div
      className="col-md-12"
      style={{
        borderRadius: "15px",
        margin: "5px 0px",
      }}
    >
      <div className="row justify-content-center" style={{ paddingTop: "5px" }}>
        <div
          style={{
            backgroundImage: `url(${props.artistImage})`,
            backgroundPosition: "center top",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            height: "180px",
            width: "180px",
            borderRadius: "15px",
            border: props.selected ? "4px solid #A6E664" : null,
            marginBottom: "20px",
          }}
        >
          <div
            className="artist-follow"
            style={{
              position: "relative",
              top: "75%",
              height: "30px",
              backgroundColor: nowFollowing ? "black" : "white",
              borderRadius: "15px",
            }}
            onMouseEnter={() => {
              onMouseOver();
            }}
            onMouseLeave={() => {
              onMouseOut();
            }}
          >
            <Link
              href={"#"}
              onClick={
                nowFollowing
                  ? () => {
                      unfollowArtist(props.artistId);
                    }
                  : () => {
                      followArtist(props.artistId);
                    }
              }
              style={{ textDecoration: "none", color: "black", width: "100%", textAlign:"center" }}
            >
              {toShow}
            </Link>
          </div>
        </div>
      </div>
      <Link
        href={props.artistUrl}
        style={{ textDecoration: "none", color: "black", width: "180px" }}
      >
        <div className="row" style={{ textAlign: "center" }}>
          <h2>{props.artistName}</h2>
        </div>
        <div
          className="row"
          style={{
            textAlign: "center",
            paddingBottom: "0",
            marginBottom: "0",
          }}
        >
          <p
            style={{
              color: "grey",
              fontSize: "20px",
              paddingBottom: "0",
              marginBottom: "0",
            }}
          >
            {props.artistFollowers.toLocaleString("en-US")}
          </p>
        </div>
      </Link>
      <div
        className="row"
        style={{
          textAlign: "center",
          paddingTop: "0",
          marginTop: "0",
        }}
      >
        <p
          style={{
            color: "grey",
            fontSize: "20px",
            paddingTop: "0",
            marginTop: "0",
          }}
        >
          Followers
        </p>
      </div>
    </div>
  );
};

export default MainArtist;
