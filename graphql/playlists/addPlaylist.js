import { gql } from '@apollo/client';

const ADD_PLAYLIST = gql`
  mutation AddPlaylist($name: String, $thumbnail: String, $songs: [ID]) {
    addPlaylist(name: $name, thumbnail: $thumbnail, songs: $songs) {
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

export default ADD_PLAYLIST;
