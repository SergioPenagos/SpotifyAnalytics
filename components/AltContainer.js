import Navbar from "./NavBar";

const AltContainer = (props) => {
  return (
    <>
      <Navbar></Navbar>
      <div
        style={{
          padding: "3em 0",
          display: "flex",
          justifyContent: "center",
          margin: "0",
        }}
      >
        {props.children}
      </div>
    </>
  );
};

export default AltContainer;
