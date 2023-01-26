import Link from "next/link";

const MainArtist = (props) => {
  return (
    <Link href={props.artistUrl} style={{ textDecoration: "none", color: "black", width: "180px" }}>
      <div
        className="col-md-12"
        style={{
          borderRadius: "15px",
          margin: "5px 0px",
        }}
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
              height: "180px",
              width: "180px",
              borderRadius: "15px",
              border: props.selected ? "4px solid #A6E664" : null,
              marginBottom: "30px"
            }}
          />
        </div>
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
    </Link>
  );
};

export default MainArtist;
