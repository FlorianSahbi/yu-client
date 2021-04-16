import { gql } from "@apollo/client";

const GET_TAGS = gql`
  query Tags($limit: Int, $page: Int) {
    tags(limit: $limit, page: $page) {
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

export default GET_TAGS;
