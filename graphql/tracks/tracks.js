import { gql } from "@apollo/client";
import {
  CORE_TRACK_FIELDS, CORE_USER_FIELDS, CORE_TAG_FIELDS,
} from "../fragments";

const TRACKS = gql`
  query Tracks($tag: ID, $title: String, $limit: Int) {
    tracks(tag: $tag, title: $title, limit: $limit) {
      ...CoreTrackFields
      creator {
        ...CoreUserFields
      }
      tags {
        ...CoreTagFields
      }
    }
  }
  ${CORE_TRACK_FIELDS}
  ${CORE_USER_FIELDS}
  ${CORE_TAG_FIELDS}
`;

export default TRACKS;
