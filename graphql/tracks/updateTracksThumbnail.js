import { gql } from "@apollo/client";

const UPDATE_TRACKS_THUMBNAIL = gql`
  mutation UpdateTracksThumbnail($id: ID, $thumbnail: String ) {
    updateTracksThumbnail(id: $id, thumbnail: $thumbnail) {
      _id
      tracks {
        thumbnail
      }
    }
  }
`;

export default UPDATE_TRACKS_THUMBNAIL;
