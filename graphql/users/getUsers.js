import { gql } from '@apollo/client';

const GET_USERS = gql`
  query Users {
    users {
      _id
      username
      avatar
    }
  }
`;

export default GET_USERS;