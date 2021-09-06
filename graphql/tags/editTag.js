import { gql } from "@apollo/client";
import {
  CORE_TAG_FIELDS,
} from "../fragments";

const EDIT_TAG = gql`
  mutation updateTag($id: ID, $tagInput: tagInput) {
    updateTag(id: $id, tagInput: $tagInput) {
        ...CoreTagFields
      }
    }
  ${CORE_TAG_FIELDS}
`;

export default EDIT_TAG;
