import Link from "next/link";


const formatDate = (dateString) => {
    const options = { month: "long", year: "numeric" };
    const albumRelease = new Date(dateString);
  
    return albumRelease.toLocaleDateString("en-US", options);
  };

const AlbumsCarrousel = (props) => {
    return (
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
            {props.albumsLoading ? (
              <p>Loading</p>
            ) : (
              <>
                {" "}
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
                      opacity: props.selectedAlbums[0] == null ? 0.6 : 1,
                      color: "white",
                    }}
                    scroll={false}
                    onClick={
                      props.selectedAlbums[0] == null
                        ? () => {}
                        : () => {
                            props.handleAlbumChangePrevious(
                              props.albums.data.items,
                              props.selectedAlbums
                            );
                          }
                    }
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
                    wordWrap: "break-word",
                  }}
                >
                  <div
                    className="row justify-content-center"
                    style={{ alignItems: "center" }}
                  >
                    {props.selectedAlbums[0] == null ? (
                      <></>
                    ) : (
                      <>
                        {" "}
                        <Link
                          href={
                            props.albums.data.items[props.selectedAlbums[0]].external_urls
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
                                props.albums.data.items[props.selectedAlbums[0]].images[0]
                                  .url
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
                            props.albums.data.items[props.selectedAlbums[0]].external_urls
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
                              textAlign: "center",
                            }}
                          >
                            <h6 style={{ marginBottom: "0px" }}>
                              {props.albums.data.items[props.selectedAlbums[0]].name}
                            </h6>
                          </div>
                        </Link>
                        <div className="col-md-12" style={{ marginTop: "0px" }}>
                          <p style={{ fontSize: "7px" }}>
                            {formatDate(
                              props.albums.data.items[props.selectedAlbums[0]].release_date
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
                        props.albums.data.items[props.selectedAlbums[1]].external_urls
                          .spotify
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
                            props.albums.data.items[props.selectedAlbums[1]].images[0].url
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
                        props.albums.data.items[props.selectedAlbums[1]].external_urls
                          .spotify
                      }
                      style={{
                        textDecoration: "none",
                        textOverflow: "ellipsis",
                      }}
                    >
                      <div
                        className="col-md-12"
                        style={{
                          marginTop: "6px",
                          color: "#535353",
                          marginBottom: "0px",
                          overflow: "hidden",
                        }}
                      >
                        <h5
                          className="overflow-ellipsis"
                          style={{
                            marginBottom: "0px",
                            textOverflow: "ellipses",
                          }}
                        >
                          {props.albums.data.items[props.selectedAlbums[1]].name}
                        </h5>
                      </div>
                    </Link>
                    <div className="col-md-12" style={{ marginTop: "0px" }}>
                      <p style={{ fontSize: "9px" }}>
                        {formatDate(
                          props.albums.data.items[props.selectedAlbums[1]].release_date
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
                    {props.selectedAlbums[2] == null || !props.selectedAlbums[2] ? (
                      <></>
                    ) : (
                      <>
                        {" "}
                        <Link
                          href={
                            props.albums.data.items[props.selectedAlbums[2]].external_urls
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
                                props.albums.data.items[props.selectedAlbums[2]].images[0]
                                  .url
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
                            props.albums.data.items[props.selectedAlbums[2]].external_urls
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
                            }}
                          >
                            <h6 style={{ marginBottom: "0px" }}>
                              {props.albums.data.items[props.selectedAlbums[2]].name}
                            </h6>
                          </div>
                        </Link>
                        <div className="col-md-12" style={{ marginTop: "0px" }}>
                          <p style={{ fontSize: "7px" }}>
                            {formatDate(
                              props.albums.data.items[props.selectedAlbums[2]].release_date
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
                      opacity: props.selectedAlbums[2] == null ? 0.6 : 1,
                      color: "white",
                    }}
                    scroll={false}
                    onClick={
                      props.selectedAlbums[2] == null
                        ? () => {}
                        : () => {
                            props.handleAlbumChangeNext(
                              props.albums.data.items,
                              props.selectedAlbums
                            );
                          }
                    }
                  >
                    &#8250;
                  </Link>
                </div>
              </>
            )}
          </div>
    );
}

export default AlbumsCarrousel;