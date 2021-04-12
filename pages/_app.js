/* eslint-disable import/no-extraneous-dependencies */
import "tailwindcss/tailwind.css";
import { ApolloProvider } from "@apollo/client";
import { SnackbarProvider } from "notistack";
import client from "../apollo-client";

function SafeHydrate({ children }) {
  return (
    <div suppressHydrationWarning>
      {typeof window === "undefined" ? null : children}
    </div>
  );
}

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <SafeHydrate>
          <Component {...pageProps} />
        </SafeHydrate>
      </SnackbarProvider>
    </ApolloProvider>
  );
}

export default MyApp;
