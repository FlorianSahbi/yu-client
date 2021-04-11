import { gql } from '@apollo/client';

const UPDATE_SONG = gql`
  mutation UpdateSong(
  $id: ID
  $title: String
  $cover: String
  $url: String
  $user: ID
  $correctWords: [String]
  ) {
    updateSong(
      id: $id
      title: $title
      cover: $cover
      url: $url
      user: $user
      correctWords: $correctWords
    ) {
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
