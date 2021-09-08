import { gql } from "@apollo/client";

const TRACKS_INDEX = gql`
  query Tracks($tag: ID, $title: String, $limit: Int) {
    tracks(tag: $tag, title: $title, limit: $limit) {
      _id
      title
      thumbnail
    }
  }
`;

export default TRACKS_INDEX;
