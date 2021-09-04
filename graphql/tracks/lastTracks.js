import { gql } from "@apollo/client";
import {
  CORE_TRACK_FIELDS, CORE_USER_FIELDS, CORE_TAG_FIELDS,
} from "../fragments";

const LAST_TRACKS = gql`
  query lastTracks {
    lastTracks {
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

export default LAST_TRACKS;
