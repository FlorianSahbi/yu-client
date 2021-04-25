import { gql } from "@apollo/client";

const ACCEPT_SONG = gql`
  mutation AcceptSong(
    $id: ID
  ) {
    acceptTrack(
      id: $id
    ) {
      _id
      isAccepted
    }
  }
`;

export default ACCEPT_SONG;
