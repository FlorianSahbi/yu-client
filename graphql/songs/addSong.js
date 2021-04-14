import { gql } from "@apollo/client";

const ADD_SONG = gql`
  mutation AddSong(
    $title: String
    $cover: String
    $url: String
    $user: ID
    $correctWords: [String]
    $tags: [ID]
  ) {
    addSong(
      title: $title
      cover: $cover
      url: $url
      user: $user
      correctWords: $correctWords
      tags: $tags
    ) {
      _id
      title
      cover
      url
      user {
        _id
        username
      }
      tags {
        name
        cover
      }
      correctWords
    }
  }
`;

export default ADD_SONG;
