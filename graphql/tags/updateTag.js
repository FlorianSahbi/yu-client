import { gql } from "@apollo/client";

const UPDATE_TAG = gql`
  mutation UpdateTag(
  $id: ID
  $name: String
  $cover: String
  ) {
    updateTag(
      id: $id
      name: $name
      cover: $cover
    ) {
      _id
      name
      cover
    }
  }
`;

export default UPDATE_TAG;
