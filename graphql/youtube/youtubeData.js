import { gql } from "@apollo/client";

const YOUTUBE_DATA = gql`
  query YoutubeData($youtubeUrls: [String]) {
    youtubeData(youtubeUrls: $youtubeUrls) {
      title
      keywords
      videoUrl
      thumbnails {
        url
        width
        height
      }
      lengthSeconds
      category
      ownerChannelName
      videoId
    }
  }
`;

export default YOUTUBE_DATA;
