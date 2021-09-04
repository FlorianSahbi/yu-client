import { gql } from "@apollo/client";
import {
  CORE_GAME_FIELDS, CORE_ROUND_FIELDS,
} from "../fragments";

const LAST_GAMES = gql`
  query lastGames {
    lastGames {
      ...CoreGameFields
      history {
        ...CoreRoundFields
      }
    }
  }
  ${CORE_GAME_FIELDS}
  ${CORE_ROUND_FIELDS}
`;

export default LAST_GAMES;
