import { gql } from "@apollo/client";
import { CORE_USER_FIELDS, CORE_TRACK_FIELDS } from "../fragments";

const USER = gql`
  query User($id: ID) {
    user(id: $id) {
      ...CoreUserFields
      discordData {
        id
        avatar
      }
      tracks {
        ...CoreTrackFields
      }
    }
  }
  ${CORE_USER_FIELDS}
  ${CORE_TRACK_FIELDS}
`;

export default USER;
