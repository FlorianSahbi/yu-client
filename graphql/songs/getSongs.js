import { gql } from '@apollo/client';

const GET_SONGS = gql`
  query Songs {
    songs {
      _id
      title
      cover
      url
    }
  }
`;

export default GET_SONGS;
