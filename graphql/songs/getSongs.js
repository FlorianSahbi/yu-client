import { gql } from "@apollo/client";

const GET_SONGS = gql`
  query Songs($tag: ID) {
    songs(tag: $tag) {
      _id
      title
      cover
      url
      isAccepted
    }
  }
`;

export default GET_SONGS;
