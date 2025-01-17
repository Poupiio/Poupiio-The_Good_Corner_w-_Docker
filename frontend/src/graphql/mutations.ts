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

export const LOGOUT = gql`
   mutation Logout {
      logout
   }
`;

export const CONFIRM_EMAIL = gql`
   mutation ConfirmEmail($codeByUser: String!) {
      confirmEmail(codeByUser: $codeByUser)
   }
`;

export const FORGOT_PASSWORD = gql`
   mutation ForgotPassword($userEmail: String!) {
      forgotPassword(userEmail: $userEmail)
   }
`;

export const CHANGE_PASSWORD = gql`
   mutation ChangePassword($password: String!, $code: String!) {
      changePassword(password: $password, code: $code)
   }
`;