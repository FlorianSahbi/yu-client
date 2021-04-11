import { gql } from '@apollo/client';

const UPDATE_PLAYLIST = gql`
  mutation UpdatePlaylist($id: ID, $name: String, $thumbnail: String, $songs: [ID]) {
    updatePlaylist(id: $id, name: $name, thumbnail: $thumbnail, songs: $songs) {
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

export default UPDATE_PLAYLIST;
