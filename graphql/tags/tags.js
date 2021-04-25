import { gql } from "@apollo/client";
import {
  CORE_TAG_FIELDS, CORE_USER_FIELDS, CORE_TRACK_FIELDS,
} from "../fragments";

const TAGS = gql`
  query Tags {
    tags {
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

export default TAGS;
