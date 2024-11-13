import { gql } from "@apollo/client";

export const UPDATE_REPO_FAVORITE = gql`
  mutation UpdateRepoFavorite(
    $isFavorite: Boolean!
    $updateRepoFavoriteId: String!
  ) {
    UpdateRepoFavorite(isFavorite: $isFavorite, id: $updateRepoFavoriteId) {
      isFavorite
      id
    }
  }
`;
