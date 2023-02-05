import AltContainer from "../components/AltContainer";
import axios from "axios";
import UserCard from "../components/UserCard";
import Link from "next/link";
import ArtistCard from "../components/ArtistCard";
import TrackCard from "../components/TrackCard";
import { useState, useEffect } from "react";
import MainArtist from "../components/MainArtist";
import AlbumsCarrousel from "../components/AlbumsCarrousel";

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
  const [albumsLoading, setAlbumsLoading] = useState(true);
  const [artistTracks, setArtistsTracks] = useState(null);
  const [tracksLoading, setTracksLoading] = useState(true);
  const [userIsFollowing, setUserIsFollowing] = useState(false);

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
      const artistTracksOptions = {
        method: "GET",
        params: {
          artist: userArtists.data.items[0].id,
          country: userProfile.data.country,
        },
        url: "/api/artistTracks",
      };
      const artistTracks = await axios(artistTracksOptions);
      const userIsFollowingOptions = {
        method: "GET",
        params: {
          artist: userArtists.data.items[0].id,
        },
        url: "/api/userFollows",
      };
      const userIsFollowing = await axios(userIsFollowingOptions);
      setUserIsFollowing(userIsFollowing);
      setArtistsTracks(artistTracks);
      setAlbumsLoading(false);
      setTracksLoading(false);
      setLoading(false);
    };

    getToken();
  }, []);

  const handleSelectorClick = (selection) => {
    setUserSelection(selection);
    setSelectedAlbums([null, 0, 1]);
  };

  const handleArtistSelection = async (clickedArtistId, spotifyId) => {
    setAlbumsLoading(true);
    setTracksLoading(true);
    setSelectedArtist(clickedArtistId);
    const artistAlbumsOptions = {
      method: "GET",
      params: { artist: spotifyId },
      url: "/api/artistAlbums",
    };
    const artistAlbums = await axios(artistAlbumsOptions);
    setAlbums(artistAlbums);
    const artistTracksOptions = {
      method: "GET",
      params: {
        artist: spotifyId,
        country: user.data.country,
      },
      url: "/api/artistTracks",
    };
    const userIsFollowingOptions = {
      method: "GET",
      params: {
        artist: spotifyId,
      },
      url: "/api/userFollows",
    };
    const userIsFollowing = await axios(userIsFollowingOptions);
    const artistTracks = await axios(artistTracksOptions);
    setUserIsFollowing(userIsFollowing);
    setArtistsTracks(artistTracks);
    setTracksLoading(false);
    setAlbumsLoading(false);
    setSelectedAlbums([null, 0, 1]);
  };

  const handleTrackSelection = (clickedTrackId) => {
    setSelectedTrack(clickedTrackId);
  };

  const handleAlbumChangeNext = (albumList, currentSelection) => {
    if (currentSelection[0] === null) {
      setSelectedAlbums([0, 1, 2]);
    } else if (selectedAlbums[2] == albumList.length - 1) {
      setSelectedAlbums([albumList.length - 2, albumList.length - 1, null]);
    } else {
      setSelectedAlbums((previousSelection) =>
        previousSelection.map((last) => last + 1)
      );
    }
  };

  const handleAlbumChangePrevious = (albumList, currentSelection) => {
    if (currentSelection[2] === null) {
      setSelectedAlbums([
        albumList.length - 3,
        albumList.length - 2,
        albumList.length - 1,
      ]);
    } else if (selectedAlbums[0] == 0) {
      setSelectedAlbums([null, 0, 1]);
    } else {
      setSelectedAlbums((previousSelection) =>
        previousSelection.map((last) => last - 1)
      );
    }
  };

  const secondsFormat = (miliseconds) => {
    const seconds = miliseconds / 1000;
    if (seconds >= 3600) {
      return new Date(seconds * 1000).toISOString().slice(11, 19);
    }
    return new Date(seconds * 1000).toISOString().slice(14, 19);
  };

  console.log("User following", userIsFollowing)

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
            style={{ overflow: "scroll", height: "89vh" }}
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
              margin: "0% 5%",
            }}
          >
            <div className="col-md-12">
              {tracksLoading ? (
                <h3>Loading</h3>
              ) : (
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
                  isArtistFollowed={userIsFollowing.data[0]}
                  artistId={artists.data.items[selectedArtist].id}
                />
              )}
            </div>
          </div>
          <div
            className="row justify-content-center"
            style={{
              display: "flex",
              textAlign: "left",
              overflowX: "hidden",
              whiteSpace: "nowrap",
              marginTop: "10px",
              marginLeft: "5%",
              width: "90%",
              padding: "20px, 0",
              height: "500px",
            }}
          >
            <div className="col-md-3" style={{ margin: "0px", padding: "0px" }}>
              
              </div>
            <div
              className="col-md-6"
              style={{ margin: "0px", padding: "0px", paddingRight:"40px" }}
            >
              {tracksLoading ? (
                <h4>Loading</h4>
              ) : (
                artistTracks.data.tracks.map((track) => {
                  return (
                    <div
                      className="row artis-selection"
                      style={{
                        width: "100%",
                        margin: "0px",
                        marginBottom: "10px",
                        borderRadius: "15px",
                        height: "80px",
                      }}
                    >
                      <div className="col-md-9">
                        <h5 style={{ margin: "0px" }}>{track.name}</h5>
                        <p
                          style={{
                            color: "grey",
                            fontSize: "12px",
                            paddingTop: "0",
                            margin: "0",
                          }}
                        >
                          {track.album.name}
                        </p>
                        <p
                          style={{
                            color: "grey",
                            fontSize: "12px",
                            paddingTop: "0",
                            margin: "0",
                          }}
                        >
                          {secondsFormat(track.duration_ms)}
                        </p>
                      </div>
                      <div
                        className="col-md-3"
                        style={{
                          background: `url(${track.album.images[0].url})`,
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat",
                          height: "75px",
                          width: "75px",
                          borderRadius: "15px",
                          marginRight: "0px",
                          marginTop: "2.5px",
                        }}
                      ></div>
                    </div>
                  );
                })
              )}
            </div>
            <div className="col-md-3" style={{ margin: "0px", padding: "0px" }}>
              
            </div>
          </div>
          <AlbumsCarrousel
            albumsLoading={albumsLoading}
            selectedAlbums={selectedAlbums}
            handleAlbumChangePrevious={handleAlbumChangePrevious}
            handleAlbumChangeNext={handleAlbumChangeNext}
            albums={albums}
          ></AlbumsCarrousel>
        </div>
      </div>
    </AltContainer>
  );
};

export default WelcomePage;
