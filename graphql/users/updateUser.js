import { gql } from '@apollo/client';

const UPDATE_USER = gql`
  mutation UpdateUser($id: ID, $username: String, $avatar: String) {
    updateUser(id: $id, username: $username, avatar: $avatar) {
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

export default UPDATE_USER;
