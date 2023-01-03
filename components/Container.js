
const Container = (props) => {
  return (
      <section
        className="ftco-section"
        style={{ padding: "4em 0", display: "block" }}
      >
        <div
          className="container"
          style={{
            display: "block",
            width: "100%",
            height: "100vh",
            padding: "0 10px",
            margin: "0 auto",
          }}
        >
          {props.children}
        </div>
      </section>
  );
};

export default Container;
