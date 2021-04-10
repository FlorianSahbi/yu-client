import "tailwindcss/tailwind.css";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";

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
      <SafeHydrate>
        <Component {...pageProps} />
      </SafeHydrate>
    </ApolloProvider>
  );
}

export default MyApp
