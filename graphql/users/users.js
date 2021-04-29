import { gql } from "@apollo/client";
import { CORE_USER_FIELDS, CORE_TRACK_FIELDS } from "../fragments";

const USERS = gql`
  query Users {
    users {
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

export default USERS;
