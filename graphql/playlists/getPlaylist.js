import { gql } from "@apollo/client";

const GET_PLAYLIST = gql`
  query Playlist($id: ID) {
    playlist(id: $id) {
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

export default GET_PLAYLIST;
