import { gql } from "@apollo/client";
import {
  CORE_TAG_FIELDS, CORE_TRACK_FIELDS,
} from "../fragments";

const ADD_TRACKS_TO_TAG = gql`
  mutation AddTracksToTags(
    $id: ID
    $trackInputs: [trackInput]
  ) {
    addTracksToTags(
      id: $id
      trackInputs: $trackInputs
    ) {
      ...CoreTagFields
      tracks {
        ...CoreTrackFields
      }
    }
  }
  ${CORE_TAG_FIELDS}
  ${CORE_TRACK_FIELDS}
`;

export default ADD_TRACKS_TO_TAG;
