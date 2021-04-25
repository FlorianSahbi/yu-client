import { gql } from "@apollo/client";
import {
  CORE_TRACK_FIELDS, CORE_USER_FIELDS, CORE_TAG_FIELDS,
} from "../fragments";

const TRACK = gql`
  query Track($id: ID) {
    track(id: $id) {
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

export default TRACK;
