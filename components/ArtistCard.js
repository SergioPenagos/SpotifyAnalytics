import Link from "next/link";

const ArtistCard = ( props ) => {
    return (
        <Link
                  href={props.artistUrl}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <div
                    className="col-md-12"
                    style={{ borderRadius: "15px", margin:"5px 0px" }}
                  >
                    <div
                      className="row justify-content-center"
                      style={{ paddingTop: "5px" }}
                    >
                      <div
                        style={{
                          backgroundImage: `url(${props.artistImage})`,
                          backgroundPosition: "center top",
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat",
                          height: "120px",
                          borderRadius: "5%",
                          width: "120px",
                          borderRadius: "50%",
                        }}
                      />
                    </div>
                    <div className="row" style={{ textAlign: "center" }}>
                      <h5>{props.artistName}</h5>
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
                          fontSize: "10px",
                          paddingBottom: "0",
                          marginBottom: "0",
                        }}
                      >
                        {props.artistFollowers.toLocaleString("en-US")}
                      </p>
                    </div>
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
                          fontSize: "10px",
                          paddingTop: "0",
                          marginTop: "0",
                        }}
                      >
                        Followers
                      </p>
                    </div>
                  </div>
                </Link>
    );
}

export default ArtistCard;