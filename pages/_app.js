import "tailwindcss/tailwind.css";
// import { SnackbarProvider } from 'notistack';
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      {/* <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      > */}
        <Component {...pageProps} />
      {/* </SnackbarProvider> */}
    </ApolloProvider>
  );
}

export default MyApp
