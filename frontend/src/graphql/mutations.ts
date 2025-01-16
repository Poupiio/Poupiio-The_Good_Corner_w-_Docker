import { gql } from "@apollo/client";

export const CREATE_AD = gql`
   mutation CreateNewAd($data: AdInput!) {
      createNewAd(data: $data) {
         id
      }
   }
`;

export const UPDATE_AD = gql`
   mutation UpdateAd($data: UpdateAdInput!) {
      updateAd(data: $data) {
         id
         title
         description
         price
         location
         createdAt
         pictures {
            url
         }
         tags {
            name
         }
      }
   }
`;

export const REMOVE_AD = gql`
   mutation RemoveAd($removeAdId: Float!) {
      removeAd(id: $removeAdId)
   }

`;

export const REGISTER = gql`
   mutation Register($data: UserInput!) {
      register(data: $data)
   }
`;
export const LOGIN = gql`
   mutation Login($data: UserInput!) {
      login(data: $data)
   }
`;