import { gql } from "@apollo/client";
import {
  CORE_USER_FIELDS,
} from "../fragments";

const LAST_USERS = gql`
  query lastUsers {
    lastUsers {
      ...CoreUserFields
    }
  }
  ${CORE_USER_FIELDS}
`;

export default LAST_USERS;
