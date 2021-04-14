import { gql } from "@apollo/client";

const DELETE_TAG = gql`
  mutation DeleteTag($id: ID) {
    deleteTag(id: $id) {
      _id
    }
  }
`;

export default DELETE_TAG;
