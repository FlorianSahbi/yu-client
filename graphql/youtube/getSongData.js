import { gql } from "@apollo/client";

const GET_SONG_DATA = gql`
    query GetSongData($url: String) {
    getSongData(url: $url) {
      title
      cover
    }
  }
`;

export default GET_SONG_DATA;
