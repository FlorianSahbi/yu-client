import { gql } from '@apollo/client';

const DELETE_PLAYLIST = gql`
  mutation DeletePlaylist($id: ID) {
    deletePlaylist(id: $id) {
      _id
    }
  }
`;

export default DELETE_PLAYLIST;
