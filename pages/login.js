import Container from "../components/Container";
import Link from "next/link";

const axios = require("axios");

const LoginPage = () => {
  const backgroundImage =
    "https://www.freepnglogos.com/uploads/spotify-logo-png/file-spotify-logo-png-4.png";

  const loginParams = {
    client_id: "19471fa4ae2345f6938568096c26bd53",
    response_type: "code",
    redirect_uri: "http://localhost:3000/user_data",
    scope: "user-read-private user-top-read user-read-recently-played user-follow-read"
  };

  return (
    <Container>
      <div className="row justify-content-center">
        <div
          className="col-md-6 col-lg-4"
          style={{
            height: "50vh",
            width: "25%",
            background: "white",
            borderRadius: "10px",
            boxShadow:"rgba(0, 0, 0, 0.35) 0px 5px 15px"
          }}
        >
          <div
            className="login-wrap py-5"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <div
              className="img d-flex align-items-center justify-content-center"
              style={{
                display: "flex",
                backgroundImage: `url(${backgroundImage})`,
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                marginBottom: "10px",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
              }}
            ></div>
          </div>
          <div style={{padding:"10px 20%", alignItems:"center", alignContent:"center", textAlign:"center"}}>
            <h4>
              Scan Your Spotify Profile
            </h4>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              paddingTop: "10%",
              height: "10vh",
            }}
          >
            <Link
              href={{
                pathname: "https://accounts.spotify.com/authorize",
                query: loginParams,
              }}
              style={{
                display: "table",
                fontSize: "90%",
                color: "white",
                width: "40%",
                textDecoration: "None",
              }}
            >
              <div
                style={{
                  display: "table-cell",
                  backgroundColor: "#1db954",
                  width: "100%",
                  height: "40px",
                  border: "white",
                  borderRadius: "500px",
                  textAlign: "center",
                  verticalAlign: "middle",
                  border: "1px solid black"
                }}
              >
                <h5 style={{ paddingTop: "5%" }}>Go!</h5>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default LoginPage;
