import { gql } from "@apollo/client";

const DELETE_USER = gql`
  mutation DeleteUser($id: ID) {
    deleteUser(id: $id) {
      _id
    }
  }
`;

export default DELETE_USER;
