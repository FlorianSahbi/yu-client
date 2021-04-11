import { gql } from '@apollo/client';

const ADD_SONG = gql`
  mutation AddSong($title: String, $cover: String, $url: String, $user: ID, $correctWords: [String]) {
    addSong(title: $title, cover: $cover, url: $url, user: $user, correctWords: $correctWords) {
      _id
      title
      cover
      url
      user {
        _id
        username
      }
      correctWords
    }
  }
`;

export default ADD_SONG;
