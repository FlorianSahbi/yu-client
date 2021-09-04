import { gql } from "@apollo/client";

const YOUTUBE_TRACK = gql`
  query YoutubeTrack($youtubeUrl: String) {
    youtubeTrack(youtubeUrl: $youtubeUrl) {
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

export default YOUTUBE_TRACK;
