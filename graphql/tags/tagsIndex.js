import { gql } from "@apollo/client";

const TAGS_INDEX = gql`
  query Tags {
    tags {
      name
      thumbnail
    }
  }
`;

export default TAGS_INDEX;
