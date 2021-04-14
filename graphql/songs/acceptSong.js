import { gql } from "@apollo/client";

const ACCEPT_SONG = gql`
  mutation AcceptSong(
    $id: ID
  ) {
    acceptSong(
      id: $id
    ) {
      _id
      title
      cover
      url
      correctWords
      isAccepted
      tags {
        _id
        name
        cover
      }
      user {
        _id
        username
        avatar
      }
    }
  }
`;

export default ACCEPT_SONG;
