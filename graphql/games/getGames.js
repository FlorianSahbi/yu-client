import { gql } from "@apollo/client";

const GET_GAMES = gql`
  query Games {
    games {
      createdAt
      _id
      name
      trackTime
      tags {
        name
      }
      trackTime
      history {
        song {
          _id
          title
          cover
          url
        }
        position
        rank {
          _id
          player {
            _id
            username
            avatar
          }
          position
          points
        }
      }
    }
  }
`;

export default GET_GAMES;
