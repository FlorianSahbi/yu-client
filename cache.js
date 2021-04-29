import { InMemoryCache, makeVar } from "@apollo/client";

export const isLoggedInVar = makeVar(typeof window === "undefined" ? null : !!localStorage.getItem("YuToken"));
export const currentUserId = makeVar(typeof window === "undefined" ? null : localStorage.getItem("currentUserId"));

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn: {
          read() {
            return isLoggedInVar();
          },
        },
        currentUserId: {
          read() {
            return currentUserId();
          },
        },
      },
    },
  },
});
