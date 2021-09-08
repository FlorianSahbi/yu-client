import { gql } from "@apollo/client";

const USERS_INDEX = gql`
  query Users($limit: Int) {
    users(limit: $limit) {
      _id
      discordData {
        id
        username
        avatar
      }
    }
  }
`;

export default USERS_INDEX;
