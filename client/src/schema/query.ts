import { gql } from "@apollo/client";

export const GET_REPOS = gql`
  query getAllRepo($filter: Float) {
    allRepos(filter: $filter) {
      id
      langs {
        id
        label
      }
      name
      status {
        id
        label
      }
      url
    }
    allLangs {
      label
      id
    }
    allStatus {
      id
      label
    }
  }
`;

export const REPO_BY_ID = gql`
  query RepoById($repoByIdId: String!) {
    repoById(id: $repoByIdId) {
      id
      langs {
        label
        id
      }
      isFavorite
      name
      status {
        label
        id
      }
      url
    }
  }
`;

export const LOGIN = gql`
  query Login($password: String!, $email: String!) {
    login(password: $password, email: $email)
  }
`;
