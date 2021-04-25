import { gql } from "@apollo/client";
import {
  CORE_TAG_FIELDS, CORE_USER_FIELDS, CORE_TRACK_FIELDS,
} from "../fragments";

const TAG = gql`
  query Tag($id: ID) {
    tag(id: $id) {
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
  ${CORE_USER_FIELDS}
  ${CORE_TRACK_FIELDS}
`;

export default TAG;
