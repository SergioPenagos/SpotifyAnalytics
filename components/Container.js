import Navbar from "./NavBar";
import { motion } from "framer-motion";

const Container = (props) => {
  return (
    <>
      <Navbar />
      <section
        className="ftco-section"
        style={{ padding: "4em 0", display: "block" }}
      >
        <motion.div
          className="container"
          style={{
            display: "block",
            width: "100%",
            height: "90vh",
            padding: "0 5px",
            margin: "0 auto",
          }}
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 30,
          }}
        >
          {props.children}
        </motion.div>
      </section>
    </>
  );
};

export default Container;
