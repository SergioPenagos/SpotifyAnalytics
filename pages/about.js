import Container from "../components/Container";
import {useSession, signIn, signOut} from 'next-auth/react';
import Link from "next/link";

const axios = require("axios");

const AboutPage = () => {
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
        </div>
      </div>
    </Container>
  );
};


export default AboutPage;

