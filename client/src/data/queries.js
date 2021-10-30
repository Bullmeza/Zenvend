import { gql } from "@apollo/client";

const GET_USER_BY_SESSION_ID = gql`
   query getUserBySessionId($sessionid: String!) {
      getUserBySessionId(input: { sessionid: $sessionid }) {
         email
         points
         id
      }
   }
`;

const LOGIN = gql`
   query login($email: String!, $password: String!) {
      login(input: { email: $email, password: $password }) {
         sessionid
      }
   }
`;

const GET_PRODUCTS_BY_LOCATION = gql`
   query getProductsByLocation($location: [Float!]!, $radius: Int!) {
      getProductsByLocation(
         input: { coordinates: $location, radius: $radius }
      ) {
         name
         description
         image
         price {
            currency
            value
         }
         id
         location {
            coordinates
         }
      }
   }
`;

export { GET_USER_BY_SESSION_ID, LOGIN, GET_PRODUCTS_BY_LOCATION };
