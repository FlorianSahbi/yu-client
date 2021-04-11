import { gql } from '@apollo/client';

const UPDATE_SONG = gql`
  mutation UpdateSong($id: ID, $title: String, $cover: String, $url: String) {
    updateSong(id: $id, title: $title, cover: $cover, url: $url) {
      _id
      title
      cover
      url
      correctWords
      user {
        _id
        username
        avatar
      }
    }
  }
`;

export default UPDATE_SONG;
