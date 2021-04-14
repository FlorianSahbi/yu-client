import { gql } from "@apollo/client";

const GET_TAGS = gql`
  query Tags {
    tags {
      _id
      name
      cover
    }
  }
`;

export default GET_TAGS;
