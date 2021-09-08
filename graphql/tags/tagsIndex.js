import { gql } from "@apollo/client";

const TAGS_INDEX = gql`
  query Tags($limit: Int) {
    tags(limit: $limit) {
      _id
      name
      thumbnail
    }
  }
`;

export default TAGS_INDEX;
