import { gql } from "@apollo/client";

const GET_SONGS = gql`
  query Songs {
    songs {
      _id
      title
      cover
      url
      isAccepted
    }
  }
`;

export default GET_SONGS;
