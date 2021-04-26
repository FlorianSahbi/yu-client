import { gql } from "@apollo/client";
import {
  CORE_TAG_FIELDS, CORE_TRACK_FIELDS, CORE_USER_FIELDS,
} from "../fragments";

const CREATE_TAG = gql`
  mutation CreateTag($tagInput: tagInput) {
    createTag(tagInput: $tagInput) {
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
