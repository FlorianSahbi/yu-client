import { gql } from "@apollo/client";

const UPDATE_TAG_THUMBNAIL = gql`
  mutation UpdateTagThumbnail($id: ID, $thumbnail: String) {
    updateTagThumbnail(id: $id, thumbnail: $thumbnail) {
      _id
      name
      thumbnail
    }
  }
`;

export default UPDATE_TAG_THUMBNAIL;
