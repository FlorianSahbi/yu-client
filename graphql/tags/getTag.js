import { gql } from "@apollo/client";

const GET_TAG = gql`
  query Tag($id: ID) {
    tag(id: $id) {
      pagingCounter
      totalDocs
      limit
      totalPages
      page
      hasPrevPage
      hasNextPage
      docs {
        _id
        name
        cover
      }
    }
  }
`;

export default GET_TAG;
