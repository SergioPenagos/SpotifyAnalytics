import AltContainer from "../components/AltContainer";
import axios from "axios";
import UserCard from "../components/UserCard";
import Link from "next/link";
import { useState, useEffect } from "react";

const trackAnalysis = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [following, setFollowing] = useState(null);
  const [tracks, setTracks] = useState(null);
  const [tracksFeatures, setTracksFeatures] = useState(null);


  useEffect(() => {
    const getToken = async () => {
      const userProfileOptions = {
        method: "GET",
        url: "/api/userProfile",
      };
      const userProfile = await axios(userProfileOptions);
      setUser(userProfile);
      const userFollowingOptions = {
        method: "GET",
        url: "/api/userFollowing",
      };
      const userFollowing = await axios(userFollowingOptions);
      setFollowing(userFollowing);
      const userTracksOptions = {
        method: "GET",
        url: "/api/userTracks",
        params: { offset:0, limit:50 }, 
      };
      const userTracks = await axios(userTracksOptions);
      const userNextTracksOptions = {
        method: "GET",
        url: "/api/userTracks",
        params: { offset:50, limit:50 }, 
      };
      const userNextTracks = await axios(userNextTracksOptions);
      const allTracks = userTracks.data.items.concat(userNextTracks.data.items)
      let ids = []
      allTracks.map(track=>{ids.push(track.id)})
      let idsQuery = ids.join(",")
      const topTracksFeaturesOptions = {
        method: "GET",
        url: "/api/tracksFeatures",
        params: { ids:idsQuery.slice(1)}, 
      };
      const topTracksFeatures = await axios(topTracksFeaturesOptions);
      console.log(topTracksFeatures.data)
      setTracksFeatures(topTracksFeatures.data)
      setTracks(allTracks);
      setLoading(false);
    };

    getToken();
  }, []);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader">
          <span className="stroke"></span>
          <span className="stroke"></span>
          <span className="stroke"></span>
          <span className="stroke"></span>
          <span className="stroke"></span>
          <span className="stroke"></span>
          <span className="stroke"></span>
        </div>
      </div>
    );
  }
  return (
    <AltContainer>
      <div
        className="row"
        style={{
          display: "block",
          width: "100%",
          background: "white",
          borderRadius: "3%",
          margin: "0px 150px",
          padding: "0px",
        }}
      >
        <UserCard
          userImage={user.data.images[0].url}
          userLink={user.data.external_urls.spotify}
          userName={user.data.display_name}
          userFollowers={user.data.followers.total}
          userFollowing={following.data.total}
        />
        <ul>
         {tracks.map(track=>{
            return(<li>{track.name}</li>)
         })}
        </ul>
        <div className="row" style={{ width: "100%", margin: "20px 20px" }}>
          <nav className="indicators">
            <ul>
              <Link href={"/user_data"}>
                <li className="current"></li>
              </Link>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </nav>
        </div>
      </div>
    </AltContainer>
  );
};

export default trackAnalysis;
