import "tailwindcss/tailwind.css";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
import { SnackbarProvider } from 'notistack';

function SafeHydrate({ children }) {
  return (
    <div suppressHydrationWarning>
      {typeof window === 'undefined' ? null : children}
    </div>
  )
}

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <SafeHydrate>
          <Component {...pageProps} />
        </SafeHydrate>
      </SnackbarProvider>
    </ApolloProvider>
  );
}

export default MyApp
