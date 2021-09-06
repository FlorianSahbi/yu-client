import { gql } from "@apollo/client";

const TAGS_INDEX = gql`
  query Tags {
    tags {
      _id
      name
      thumbnail
    }
  }
`;

export default TAGS_INDEX;
