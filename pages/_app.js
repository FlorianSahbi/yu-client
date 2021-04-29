/* eslint-disable import/no-extraneous-dependencies */
import "tailwindcss/tailwind.css";
import Head from "next/head";
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

console.log(process.env.NEXT_PUBLIC_APOLLO_URI);

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
          <Head>
            <link
              rel="preconnect"
              href="https://fonts.gstatic.com"
              crossOrigin="true"
            />
            <link
              rel="preload"
              as="style"
              href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300&display=swap"
            />
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300&display=swap"
              media="print"
              onLoad="this.media='all'"

            />
            <noscript>
              <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300&display=swap"
              />
            </noscript>
          </Head>
          <Component {...pageProps} />
        </SafeHydrate>
      </SnackbarProvider>
    </ApolloProvider>
  );
}

export default MyApp;
