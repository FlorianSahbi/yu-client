import { gql } from "@apollo/client";

const UPDATE_GAME = gql`
  mutation UpdateGame($id: ID, $name: String, $thumbnail: String, $songs: [ID]) {
    updateGame(id: $id, name: $name, thumbnail: $thumbnail, songs: $songs) {
      _id
      name
      thumbnail
      songs {
        _id
        title
        cover
        url
      }
    }
  }
`;

export default UPDATE_GAME;
