import { gql } from "@apollo/client";
import {
  CORE_TAG_FIELDS, CORE_GAME_FIELDS, CORE_ROUND_FIELDS, CORE_USER_FIELDS,
} from "../fragments";

const GAME = gql`
  query Game($id: ID) {
    game(id: $id) {
      ...CoreGameFields
      users {
        ...CoreUserFields
      }
      tags {
        ...CoreTagFields
      }
      history {
        ...CoreRoundFields
      }
    }
  }
  ${CORE_TAG_FIELDS}
  ${CORE_GAME_FIELDS}
  ${CORE_ROUND_FIELDS}
  ${CORE_USER_FIELDS}
`;

export default GAME;
