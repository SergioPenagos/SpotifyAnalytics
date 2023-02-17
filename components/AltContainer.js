import Navbar from "./NavBar";

const AltContainer = (props) => {
    return (
      <>
        <Navbar></Navbar>
        <div
        style={{ padding: "3em 0", display: "flex", justifyContent:"center", margin:"0" }}
      >
        <div
          className="row"
          style={{
            display: "block",
            width: "100%",
            background:"white",
            borderRadius: "3%",
            margin:"0px 150px",
            padding:"0px"
          }}
        >
          {props.children}
        </div>
      </div>
      </>
    );
}

export default AltContainer;