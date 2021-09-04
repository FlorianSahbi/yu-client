import { gql } from "@apollo/client";

const TRACK_FOR_UPDATE = gql`
  query Track($id: ID) {
    track(id: $id) {
      title
      thumbnail
      answers
      videoId
    }
  }
`;

export default TRACK_FOR_UPDATE;
