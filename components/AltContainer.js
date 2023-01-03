const AltContainer = (props) => {
    return (
        <div
        style={{ padding: "3em 0", display: "flex", justifyContent:"center", margin:"0" }}
      >
        <div
          className="row"
          style={{
            display: "block",
            width: "100%",
            height: "90vh",
            background:"white",
            borderRadius: "3%",
            margin:"0px 150px",
            padding:"0px"
          }}
        >
          {props.children}
        </div>
      </div>
    );
}

export default AltContainer;