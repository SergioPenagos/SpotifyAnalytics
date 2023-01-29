import Link from "next/link";

const MainArtist = (props) => {
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
            style={{
              position: "relative",
              top: "75%",
              left: "80%",
              width: "30px",
              height: "30px",
              backgroundColor: props.isArtistFollowed ? "black":"white",
              borderRadius: "15px",
            }}
          >
            <Link
              href="#"
              style={{ textDecoration: "none", color: "black", width: "100%" }}
            >
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
