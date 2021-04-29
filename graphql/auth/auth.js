import { gql } from "@apollo/client";
import {
  CORE_USER_FIELDS,
} from "../fragments";

const AUTH = gql`
  query Auth($code: String) {
    auth(code: $code) {
      token {
        access_token
        expires_in
        refresh_token
        scope
        token_type
      }
      user {
        ...CoreUserFields
        discordData {
          id
          username
          avatar
          discriminator
          public_flags
          flags
          locale
          mfa_enabled
          email
          verified
        }
      }
    }
  }
  ${CORE_USER_FIELDS}
`;

export default AUTH;
