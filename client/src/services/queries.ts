import { gql } from "@apollo/client";

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    getCurrentUser {
      id
      name
      email
      role
      ... on Admin {
        permissions
      }
      ... on Employee {
        purchaseHistory
      }
    }
  }
`;
