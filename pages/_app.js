import { UserWrapper } from "../context/UserContext";

import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

import SSRProvider from "react-bootstrap/SSRProvider";

function MyApp({ Component, pageProps }) {
  return (
    <SSRProvider>
      <UserWrapper>
        <Component {...pageProps} />
      </UserWrapper>
    </SSRProvider>
  );
}

export default MyApp;
