import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body style={{ background: "linear-gradient(#e66465, #9198e5)" }}>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@300&display=swap"
          rel="stylesheet"
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
