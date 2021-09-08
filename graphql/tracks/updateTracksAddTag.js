import { gql } from "@apollo/client";

const UPDATE_TRACK_ADD_TAG = gql`
  mutation UpdateTrackAddTag($id: ID, $tagToAddId: ID) {
    updateTracksAddTag(id: $id, tagToAddId: $tagToAddId) {
      tracks {
        tags {
          _id
          name
        }
      }
    }
  }
`;

export default UPDATE_TRACK_ADD_TAG;
