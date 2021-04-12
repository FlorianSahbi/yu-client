import { gql } from "@apollo/client";

const GET_USER = gql`
  query User($id: ID) {
    user(id: $id) {
      _id
      username
      avatar
      songs {
        _id
        title
        cover
        url
      }
    }
  }
`;

export default GET_USER;
