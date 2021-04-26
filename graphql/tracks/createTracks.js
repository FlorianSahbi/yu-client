import { gql } from "@apollo/client";
import {
  CORE_TRACK_FIELDS, CORE_USER_FIELDS, CORE_TAG_FIELDS,
} from "../fragments";

const CREATE_TRACKS = gql`
    mutation CreateTracks($trackInputs: [trackInput]) {
    createTracks(trackInputs: $trackInputs) {
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

export default CREATE_TRACKS;
