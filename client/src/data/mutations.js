import { gql } from "@apollo/client";

const CREATE_USER = gql`
   mutation createUsers($email: String!, $password: String!) {
      createUser(input: { email: $email, password: $password }) {
         sessionid
      }
   }
`;

const CREATE_PRODUCT = gql`
   mutation createProduct(
      $name: String!
      $price: Float!
      $currency: String!
      $description: String!
      $image: String!
      $author: String!
      $storeName: String!
      $location: [Float!]!
   ) {
      createProduct(
         input: {
            name: $name
            price: { currency: $currency, value: $price }
            description: $description
            image: $image
            author: $author
            storeName: $storeName
            location: { coordinates: $location }
         }
      ) {
         id
      }
   }
`;
export { CREATE_USER, CREATE_PRODUCT };
