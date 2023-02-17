import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/Home.css";
import "../styles/UserData.css";
import { SessionProvider } from "next-auth/react";
import { AnimatePresence } from "framer-motion";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <AnimatePresence mode="wait" initial={false}>
      <Component {...pageProps} />
      </AnimatePresence>
    </SessionProvider>
  );
}
