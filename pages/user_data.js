import AltContainer from "../components/AltContainer";
import qs from "qs";
import axios from "axios";
import { user, tracks, artists, following, albums } from "../fixtures/testData";
import UserCard from "../components/UserCard";
import Link from "next/link";
import ArtistCard from "../components/ArtistCard";
import TrackCard from "../components/TrackCard";
import { useState, useEffect } from "react";
import MainArtist from "../components/MainArtist";
import { animated, useSpring } from "react-spring";
import { useScroll } from "react-use-gesture";
import { getSession } from "next-auth/react";

const formatDate = (dateString) => {
  const options = { month: "long", year: "numeric" };
  const albumRelease = new Date(dateString);

  return albumRelease.toLocaleDateString("en-US", options);
};

const WelcomePage = () => {
  const [userSelection, setUserSelection] = useState("Artists");
  const [selectedArtist, setSelectedArtist] = useState(0);
  const [selectedTrack, setSelectedTrack] = useState(0);
  const [albums, setAlbums] = useState(null);
  const [user, setUser] = useState(null);
  const [tracks, setTracks] = useState(null);
  const [artists, setArtists] = useState(null);
  const [following, setFollowing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedAlbums, setSelectedAlbums] = useState([null, 0, 1]);
  const [albumsLoading, setAlbumsLoading] = useState(true)

  useEffect(() => {
    const getToken = async () => {
      const userProfileOptions = {
        method: "GET",
        url: "/api/userProfile",
      };
      const userProfile = await axios(userProfileOptions);
      setUser(userProfile);
      const userArtistsOptions = {
        method: "GET",
        url: "/api/userArtists",
      };
      const userArtists = await axios(userArtistsOptions);
      setArtists(userArtists);
      const userTracksOptions = {
        method: "GET",
        url: "/api/userTracks",
      };
      const userTracks = await axios(userTracksOptions);
      setTracks(userTracks);
      const userFollowingOptions = {
        method: "GET",
        url: "/api/userFollowing",
      };
      const userFollowing = await axios(userFollowingOptions);
      setFollowing(userFollowing);
      const artistAlbumsOptions = {
        method: "GET",
        params: { artist: userArtists.data.items[0].id },
        url: "/api/artistAlbums",
      };
      const artistAlbums = await axios(artistAlbumsOptions);
      setAlbums(artistAlbums);
      setAlbumsLoading(false)
      setLoading(false);
    };

    getToken();
  }, []);

  const handleSelectorClick = (selection) => {
    setUserSelection(selection);
    setSelectedAlbums([null, 0, 1])
  };

  const handleArtistSelection = async (clickedArtistId, spotifyId) => {
    setAlbumsLoading(true)
    setSelectedArtist(clickedArtistId);
    const artistAlbumsOptions = {
      method: "GET",
      params: { artist: spotifyId },
      url: "/api/artistAlbums",
    };
    const artistAlbums = await axios(artistAlbumsOptions);
    setAlbums(artistAlbums);
    setAlbumsLoading(false);
    setSelectedAlbums([null, 0, 1]);
  };

  const handleTrackSelection = (clickedTrackId) => {
    setSelectedTrack(clickedTrackId);
  };

  const handleAlbumChangeNext = (albumList, currentSelection) => {
    if (currentSelection[0] === null) {
      setSelectedAlbums([0, 1, 2]);
    } else if (selectedAlbums[2] == albumList.length -1) {
      setSelectedAlbums([albumList.length - 2, albumList.length - 1, null]);
    } else {
      setSelectedAlbums(previousSelection => previousSelection.map(last => last+1)
      );
    }
  };

  const handleAlbumChangePrevious = (albumList, currentSelection) => {
    if (currentSelection[2] === null) {
      setSelectedAlbums([albumList.length - 3, albumList.length - 2, albumList.length - 1]);
    } else if (selectedAlbums[0] == 0) {
      setSelectedAlbums([null, 0, 1]);
    } else {
      setSelectedAlbums(previousSelection => previousSelection.map(last => last-1)
      );
    }
  };

  console.log(selectedAlbums)

  if (loading) {
    return <AltContainer></AltContainer>;
  }
  return (
    <AltContainer>
      <UserCard
        userImage={user.data.images[0].url}
        userLink={user.data.external_urls.spotify}
        userName={user.data.display_name}
        userFollowers={user.data.followers.total}
        userFollowing={following.data.total}
      />
      <div className="row" style={{ width: "100%", margin: "20px 20px" }}>
        <div className="col-md-3 col-lg-2">
          <div
            className="row justify-content-center"
            style={{ textAlign: "center" }}
          >
            <h2>Top {userSelection}</h2>
          </div>
          <div className="row" style={{ marginBottom: "8px" }}>
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
                    color: "white",
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
                    color: "white",
                  }}
                >
                  Tracks
                </div>
              </Link>
            </div>
          </div>
          <div
            className="row artists"
            style={{ overflow: "scroll", height: "80vh" }}
          >
            {userSelection == "Artists"
              ? artists.data.items.map((artist, index) => {
                  console.log(index === selectedArtist);
                  return (
                    <ArtistCard
                      spotifyId={artist.id}
                      artistUrl={artist.external_urls.spotify}
                      artistImage={artist.images[0].url}
                      artistName={artist.name}
                      artistFollowers={artist.followers.total}
                      selected={selectedArtist === index ? true : false}
                      artistId={index}
                      changeSelection={handleArtistSelection}
                    />
                  );
                })
              : tracks.data.items.map((track, index) => {
                  return (
                    <TrackCard
                      trackImage={track.album.images[0].url}
                      trackUrl={track.external_urls.spotify}
                      trackName={track.name}
                      artistUrl={track.artists[0].external_urls.spotify}
                      artistName={track.artists[0].name}
                      duration={track.duration_ms}
                      selected={selectedTrack === index ? true : false}
                      trackId={index}
                      changeSelection={handleTrackSelection}
                    />
                  );
                })}
          </div>
        </div>
        <div
          className="col-md-9 col-lg-10"
          style={{
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          <div
            className="row"
            style={{
              display: "flex",
              textAlign: "center",
              paddingLeft: "10px",
            }}
          >
            <div className="col-md-12">
              <MainArtist
                artistUrl={
                  artists.data.items[selectedArtist].external_urls.spotify
                }
                artistImage={artists.data.items[selectedArtist].images[0].url}
                artistName={artists.data.items[selectedArtist].name}
                artistFollowers={
                  artists.data.items[selectedArtist].followers.total
                }
                mainDisplay={true}
              />
            </div>
          </div>
          <div
            className="row justify-content-center"
            style={{
              display: "block",
              textAlign: "center",
              overflowX: "hidden",
              whiteSpace: "nowrap",
              marginTop: "25px",
              marginLeft: "2.5%",
              width: "95%",
              padding: "20px, 0",
              height: "200px",
            }}
          >
           {albumsLoading? <p>Loading</p>:<> <div
              className="col-md-1"
              style={{
                display: "inline-block",
                float: "none",
                alignContent: "center",
              }}
            >
              <Link
                href="#"
                style={{
                  textDecoration: "none",
                  display: "inline-block",
                  padding: "8px 16px",
                  borderRadius: "50%",
                  background: "#A6E664",
                  opacity: selectedAlbums[0] == null ?0.6:1,
                  color: "white",
                }}
                onClick = {selectedAlbums[0] == null? ()=>{}:()=>{handleAlbumChangePrevious(albums.data.items, selectedAlbums)}}
              >
                &#8249;
              </Link>
            </div>
            <div
              className="col-md-3 album-main"
              style={{
                display: "inline-block",
                float: "none",
                alignContent: "center",
                wordWrap: "break-word"
              }}
            >
              <div
                className="row justify-content-center"
                style={{ alignItems: "center" }}
              >
                {selectedAlbums[0] == null ? (
                  <></>
                ) : (
                  <>
                    {" "}
                    <Link
                      href={
                        albums.data.items[selectedAlbums[0]].external_urls
                          .spotify
                      }
                      style={{
                        textDecoration: "none",
                        height: "60px",
                        width: "60px",
                        margin: "0px",
                        padding: "0px",
                      }}
                    >
                      <div
                        style={{
                          backgroundImage: `url(${albums.data.items[selectedAlbums[0]].images[0].url})`,
                          backgroundPosition: "center top",
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat",
                          height: "60px",
                          width: "60px",
                          borderRadius: "15px",
                        }}
                      />
                    </Link>
                    <Link
                      href={
                        albums.data.items[selectedAlbums[0]].external_urls
                          .spotify
                      }
                      style={{ textDecoration: "none" }}
                    >
                      <div
                        className="col-md-12"
                        style={{
                          marginTop: "6px",
                          color: "#535353",
                          marginBottom: "0px",
                          overflow: "hidden",
                          textAlign: "center"
                        }}
                      >
                        <h6 style={{ marginBottom: "0px" }}>
                          {albums.data.items[selectedAlbums[0]].name}
                        </h6>
                      </div>
                    </Link>
                    <div className="col-md-12" style={{ marginTop: "0px" }}>
                      <p style={{ fontSize: "7px" }}>
                        {formatDate(
                          albums.data.items[selectedAlbums[0]].release_date
                        )}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div
              className="col-md-3 album-main"
              style={{
                maxWidth: "100%",
                display: "inline-block",
                float: "none",
                alignContent: "center",
              }}
            >
              <div
                className="row justify-content-center"
                style={{ alignItems: "center" }}
              >
                <Link
                  href={
                    albums.data.items[selectedAlbums[1]].external_urls.spotify
                  }
                  style={{
                    textDecoration: "none",
                    height: "100px",
                    width: "100px",
                    margin: "0px",
                    padding: "0px",
                  }}
                >
                  <div
                    style={{
                      backgroundImage: `url(${
                        albums.data.items[selectedAlbums[1]].images[0].url
                      })`,
                      backgroundPosition: "center top",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      height: "100px",
                      width: "100px",
                      borderRadius: "15px",
                    }}
                  />
                </Link>
                <Link
                  href={
                    albums.data.items[selectedAlbums[1]].external_urls.spotify
                  }
                  style={{ textDecoration: "none", textOverflow: "ellipsis" }}
                >
                  <div
                    className="col-md-12"
                    style={{
                      marginTop: "6px",
                      color: "#535353",
                      marginBottom: "0px",
                      overflow:"hidden"
                    }}
                  >
                    <h5 className="overflow-ellipsis" style={{ marginBottom: "0px", textOverflow:"ellipses" }}>
                      {albums.data.items[selectedAlbums[1]].name}
                    </h5>
                  </div>
                </Link>
                <div className="col-md-12" style={{ marginTop: "0px" }}>
                  <p style={{ fontSize: "9px" }}>
                    {formatDate(
                      albums.data.items[selectedAlbums[1]].release_date
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div
              className="col-md-3 album-main"
              style={{
                display: "inline-block",
                float: "none",
                alignContent: "center",
              }}
            >
              <div
                className="row justify-content-center"
                style={{ alignItems: "center" }}
              >
                {(selectedAlbums[2] == null || !selectedAlbums[2]) ? (
                  <></>
                ) : (
                  <>
                    {" "}
                    <Link
                      href={
                        albums.data.items[selectedAlbums[2]].external_urls
                          .spotify
                      }
                      style={{
                        textDecoration: "none",
                        height: "60px",
                        width: "60px",
                        margin: "0px",
                        padding: "0px",
                      }}
                    >
                      <div
                        style={{
                          backgroundImage: `url(${
                            albums.data.items[selectedAlbums[2]].images[0].url
                          })`,
                          backgroundPosition: "center top",
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat",
                          height: "60px",
                          width: "60px",
                          borderRadius: "15px",
                        }}
                      />
                    </Link>
                    <Link
                      href={
                        albums.data.items[selectedAlbums[2]].external_urls
                          .spotify
                      }
                      style={{ textDecoration: "none" }}
                    >
                      <div
                        className="col-md-12"
                        style={{
                          marginTop: "6px",
                          color: "#535353",
                          marginBottom: "0px",
                          overflow:"hidden"
                        }}
                      >
                        <h6 style={{ marginBottom: "0px" }}>
                          {albums.data.items[selectedAlbums[2]].name}
                        </h6>
                      </div>
                    </Link>
                    <div className="col-md-12" style={{ marginTop: "0px" }}>
                      <p style={{ fontSize: "7px" }}>
                        {formatDate(
                          albums.data.items[selectedAlbums[2]].release_date
                        )}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div
              className="col-md-1"
              style={{
                display: "inline-block",
                float: "none",
                alignContent: "center",
              }}
            >
              <Link
                href="#"
                style={{
                  textDecoration: "none",
                  display: "inline-block",
                  padding: "8px 16px",
                  borderRadius: "50%",
                  background: "#A6E664",
                  opacity: selectedAlbums[2] == null ?0.6:1,
                  color: "white",
                }}
                onClick = {selectedAlbums[2] == null? ()=>{}:()=>{handleAlbumChangeNext(albums.data.items, selectedAlbums)}}
              >
                &#8250;
              </Link>
            </div></>}
          </div>
          <div
            className="row justify-content-center"
            style={{
              display: "block",
              textAlign: "center",
              overflowX: "hidden",
              whiteSpace: "nowrap",
              marginTop: "10px",
              marginLeft: "2.5%",
              width: "95%",
              padding: "20px, 0",
              height: "200px",
            }}
          >
            <div className="col-md-12" style={{margin:"0px", padding:"0px"}}>
              a
            </div>
          </div>
          <div
            className="row justify-content-center"
            style={{
              display: "block",
              textAlign: "center",
              overflowX: "hidden",
              whiteSpace: "nowrap",
              marginTop: "10px",
              marginLeft: "2.5%",
              width: "95%",
              padding: "20px, 0",
              height: "200px",
            }}
          >
            <div className="col-md-12" style={{margin:"0px", padding:"0px"}}>
              a
            </div>
          </div>
        </div>
      </div>
    </AltContainer>
  );
};

export default WelcomePage;
