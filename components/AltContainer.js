const AltContainer = (props) => {
    return (
        <section
        className="ftco-section"
        style={{ padding: "5em 0", display: "block" }}
      >
        <div
          className="container"
          style={{
            display: "block",
            width: "100%",
            height: "84vh",
            background:"white",
            borderRadius: "5%"
          }}
        >
          {props.children}
        </div>
      </section>
    );
}

export default AltContainer;