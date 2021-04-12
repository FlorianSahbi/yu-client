import { gql } from "@apollo/client";

const GET_PLAYLISTS = gql`
  query Playlists {
    playlists {
      _id
      name
      thumbnail
      songs {
        _id
        title
        cover
      }
    }
  }
`;

export default GET_PLAYLISTS;
