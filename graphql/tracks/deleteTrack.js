import { gql } from "@apollo/client";

const DELETE_TRACK = gql`
  mutation DeleteTrack($id: ID) {
    deleteTrack(id: $id) {
      _id
    }
  }
`;

export default DELETE_TRACK;
