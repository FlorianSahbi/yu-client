import { gql } from "@apollo/client";

const DELETE_GAME = gql`
  mutation DeleteGame($id: ID) {
    deleteGame(id: $id) {
      _id
    }
  }
`;

export default DELETE_GAME;
