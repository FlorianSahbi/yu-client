import { gql } from "@apollo/client";
import {
  CORE_TAG_FIELDS, CORE_GAME_FIELDS, CORE_TRACK_FIELDS, CORE_ROUND_FIELDS,
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
  ${CORE_TRACK_FIELDS}
  ${CORE_ROUND_FIELDS}
`;

export default GAME;
