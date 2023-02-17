import { getProviders, signIn, useSession } from "next-auth/react";
import { unstable_getServerSession } from "next-auth/next";
import { NextAuthOptions } from "./api/auth/[...nextauth]";
import Container from "../components/Container";
import Link from "next/link";

export default function SignIn({ providers }) {
  const {data: session} = useSession();
  const backgroundImage =
    "https://www.freepnglogos.com/uploads/spotify-logo-png/file-spotify-logo-png-4.png";
  
  console.log(session)

  return (
    <Container>
      <div className="row justify-content-center">
        <div
          className="col-md-6 col-lg-4"
          style={{
            height: "35rem",
            width: "100%",
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
            <h1 style={{fontFamily:"Roboto", fontWeight:400, fontSize:"50px"}}>
              Scan Your Spotify Profile
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
            {Object.values(providers).map((provider) => (
              <Link
              className="login-button"
              key = {provider.id}
              href="/user_data"
              style={{
                display: "table",
                fontSize: "90%",
                color: "white",
                width: "15%",
                textDecoration: "None",
              }}
              onClick={() => signIn(provider.id)}
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
                <h5 style={{ paddingTop: "5%" }}>Check Profile</h5>
              </div>
            </Link>
            ))}
            
          </div>
        </div>
      </div>
    </Container>
  )
}

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(context.req, context.res, NextAuthOptions);
  
  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: "/user_data" } };
  }

  const providers = await getProviders(context);
  
  return {
    props: { providers: Object.values(providers) ?? [] },
  }
}