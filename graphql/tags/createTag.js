import { gql } from "@apollo/client";
import {
  CORE_TAG_FIELDS, CORE_TRACK_FIELDS, CORE_USER_FIELDS,
} from "../fragments";

const CREATE_TAG = gql`
  mutation CreateTag(
    $name: String
    $thumbnail: String
    $tracks: [ID]
    $creator: ID
  ) {
    createTag(
      tagInput: {
        name: $name
        thumbnail: $thumbnail
        tracks: $tracks
        creator: $creator
      }
    ) {
      ...CoreTagFields
      tracks {
        ...CoreTrackFields
      }
      creator {
        ...CoreUserFields
      }
    }
  }
  ${CORE_TAG_FIELDS}
  ${CORE_TRACK_FIELDS}
  ${CORE_USER_FIELDS}
`;

export default CREATE_TAG;
