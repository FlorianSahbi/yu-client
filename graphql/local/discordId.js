import { gql } from "@apollo/client";

const DISCORD_ID = gql`
  query currentUserId {
    currentUserId @client
  }
`;

export default DISCORD_ID;
