import Link from "next/link";

const secondsFormat = (miliseconds) => {
  const seconds = miliseconds / 1000;
  if (seconds >= 3600) {
    return new Date(seconds * 1000).toISOString().slice(11, 19);
  }
  return new Date(seconds * 1000).toISOString().slice(14, 19);
};

const TrackCard = ( props ) => {
  return (
    <div
      className="col-md-12"
      style={{
        margin: "5px 0px",
      }}
    >
      <div className="row" style={{ display: "flex", alignItems: "center" }}>
        <div
          className="col-md-4"
          style={{
            background: `url(${props.trackImage})`,
            backgroundPosition: "center top",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            height: "50px",
            borderRadius: "5%",
            width: "50px",
            borderRadius: "15px",
          }}
        ></div>
        <div className="col-md-8" style={{ marginTop: "12px" }}>
          <Link
            href={props.trackUrl}
            style={{ textDecoration: "none", color: "black" }}
          >
            <div className="row main-track">
              <h5 style={{ marginBottom: "0px" }}>{props.trackName}</h5>
            </div>
          </Link>
          <div className="row">
            <div className="col-md-8 track-artist">
              <Link
                href={props.artistUrl}
                style={{ textDecoration: "none", color: "black" }}
              >
                <p
                  style={{
                    color: "grey",
                    fontSize: "12px",
                    paddingTop: "0",
                    marginTop: "0",
                  }}
                >
                  {props.artistName}
                </p>
              </Link>
            </div>

            <div className="col-md-4" style={{ textAlign: "right" }}>
              <p
                style={{
                  color: "grey",
                  fontSize: "12px",
                  paddingTop: "0",
                  marginTop: "0",
                }}
              >
                {secondsFormat(props.duration)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackCard;
