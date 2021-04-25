import { gql } from "@apollo/client";
import { CORE_USER_FIELDS, CORE_TRACK_FIELDS } from "../fragments";

const CREATE_USER = gql`
  mutation CreateUser($username: String, $avatar: String, $discordId: String) {
    createUser(
      userInput: { username: $username, avatar: $avatar, discordId: $discordId }
    ) {
      ...CoreUserFields
      tracks {
        ...CoreTrackFields
      }
    }
  }
  ${CORE_USER_FIELDS}
  ${CORE_TRACK_FIELDS}
`;

export default CREATE_USER;
