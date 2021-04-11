import { gql } from '@apollo/client';

const ADD_USER = gql`
  mutation AddUser($username: String, $avatar: String) {
    addUser(username: $username, avatar: $avatar) {
      _id
      username
      avatar
    }
  }
`;

export default ADD_USER;
