import Container from "../components/Container";
import {useSession, signIn, signOut} from 'next-auth/react';
import Link from "next/link";

const axios = require("axios");

const LoginPage = () => {
  const {data: session} = useSession();
  const backgroundImage =
    "https://www.freepnglogos.com/uploads/spotify-logo-png/file-spotify-logo-png-4.png";
  
  return (
    <Container>
      <div className="row justify-content-center">
        <div
          className="col-md-6 col-lg-4"
          style={{
            height: "35rem",
            width: "100%",
            background: "white",
            opacity:"0.9",
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
            <h1 style={{fontFamily:"Roboto", fontWeight:400, fontSize:"50px"}}>
              Analyze your Spotify
            </h1>
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
              className="login-button"
              href="/"
              style={{
                display: "table",
                fontSize: "90%",
                color: "white",
                width: "15%",
                textDecoration: "None",
              }}
              onClick={() => signIn()}
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
                }}
              >
                <h5 style={{ paddingTop: "3%" }}>Continue</h5>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
};


export default LoginPage;

