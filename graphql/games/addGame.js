import { gql } from "@apollo/client";

const ADD_GAME = gql`
  mutation AddGame($name: String, $thumbnail: String, $songs: [ID]) {
    addGame(name: $name, thumbnail: $thumbnail, songs: $songs) {
      _id
      name
      songs {
        _id
        title
        cover
        url
      }
    }
  }
`;

export default ADD_GAME;
