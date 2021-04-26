import { gql } from "@apollo/client";
import {
  CORE_TAG_FIELDS, CORE_TRACK_FIELDS,
} from "../fragments";

const CREATE_CUSTOM_PLAYLIST = gql`
  mutation CreateCustomPlaylist(
    $tagInput: tagInput
    $trackInputs: [trackInput]
  ) {
    createCustomPlaylist(
      tagInput: $tagInput
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

export default CREATE_CUSTOM_PLAYLIST;
