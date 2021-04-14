import { gql } from "@apollo/client";

const ADD_TAG = gql`
  mutation AddTag($name: String, $cover: String) {
    addTag(name: $name, cover: $cover) {
      _id
      name
      cover
    }
  }
`;

export default ADD_TAG;
