import { gql } from "@apollo/client";

const GET_SONG = gql`
  query Song($id: ID) {
    song(id: $id) {
      _id
      title
      cover
      url
      correctWords
      user {
        _id
        username
        avatar
      }
    }
  }
`;

export default GET_SONG;
