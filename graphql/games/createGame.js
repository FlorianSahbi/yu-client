import { gql } from "@apollo/client";
import {
  CORE_GAME_FIELDS, CORE_TAG_FIELDS, CORE_USER_FIELDS, CORE_ROUND_FIELDS,
} from "../fragments";

const CREATE_GAME = gql`
  mutation CreateGame {
    createGame {
      ...CoreGameFields
      tags {
        ...CoreTagFields
      }
      users {
        ...CoreUserFields
      }
      creator {
        ...CoreUserFields
      }
      history {
        ...CoreRoundFields
      }
    }
  }
  ${CORE_GAME_FIELDS}
  ${CORE_TAG_FIELDS}
  ${CORE_USER_FIELDS}
  ${CORE_ROUND_FIELDS}
`;

export default CREATE_GAME;
