import { gql } from "@apollo/client";

const GET_TRACK_FROM_URL = gql`
  query GetTracksFromUrl($urls: [String]) {
    getTracksFromUrl(urls: $urls) {
      title
      keywords
      videoUrl
      thumbnails {
        url
        width
        height
      }
    }
  }
`;

export default GET_TRACK_FROM_URL;
