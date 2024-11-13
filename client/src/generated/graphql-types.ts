import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Lang = {
  __typename?: 'Lang';
  id: Scalars['Float']['output'];
  label: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  UpdateRepoFavorite: Repo;
  createNewRepo: Repo;
};


export type MutationUpdateRepoFavoriteArgs = {
  id: Scalars['String']['input'];
  isFavorite: Scalars['Boolean']['input'];
};


export type MutationCreateNewRepoArgs = {
  data: RepoInput;
};

export type Query = {
  __typename?: 'Query';
  allLangs: Array<Lang>;
  allRepos: Array<Repo>;
  allStatus: Array<Status>;
  login: Scalars['Boolean']['output'];
  repoById?: Maybe<Repo>;
};


export type QueryAllReposArgs = {
  filter?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type QueryRepoByIdArgs = {
  id: Scalars['String']['input'];
};

export type Repo = {
  __typename?: 'Repo';
  id: Scalars['ID']['output'];
  isFavorite: Scalars['Boolean']['output'];
  langs: Array<Lang>;
  name: Scalars['String']['output'];
  status: Status;
  url: Scalars['String']['output'];
};

export type RepoInput = {
  id: Scalars['String']['input'];
  isPrivate: Scalars['Float']['input'];
  name: Scalars['String']['input'];
  url: Scalars['String']['input'];
};

export type Status = {
  __typename?: 'Status';
  id: Scalars['Float']['output'];
  label: Scalars['String']['output'];
};

export type UpdateRepoFavoriteMutationVariables = Exact<{
  isFavorite: Scalars['Boolean']['input'];
  updateRepoFavoriteId: Scalars['String']['input'];
}>;


export type UpdateRepoFavoriteMutation = { __typename?: 'Mutation', UpdateRepoFavorite: { __typename?: 'Repo', isFavorite: boolean, id: string } };

export type GetAllRepoQueryVariables = Exact<{
  filter?: InputMaybe<Scalars['Float']['input']>;
}>;


export type GetAllRepoQuery = { __typename?: 'Query', allRepos: Array<{ __typename?: 'Repo', id: string, name: string, url: string, langs: Array<{ __typename?: 'Lang', id: number, label: string }>, status: { __typename?: 'Status', id: number, label: string } }>, allLangs: Array<{ __typename?: 'Lang', label: string, id: number }>, allStatus: Array<{ __typename?: 'Status', id: number, label: string }> };

export type RepoByIdQueryVariables = Exact<{
  repoByIdId: Scalars['String']['input'];
}>;


export type RepoByIdQuery = { __typename?: 'Query', repoById?: { __typename?: 'Repo', id: string, isFavorite: boolean, name: string, url: string, langs: Array<{ __typename?: 'Lang', label: string, id: number }>, status: { __typename?: 'Status', label: string, id: number } } | null };

export type LoginQueryVariables = Exact<{
  password: Scalars['String']['input'];
  email: Scalars['String']['input'];
}>;


export type LoginQuery = { __typename?: 'Query', login: boolean };


export const UpdateRepoFavoriteDocument = gql`
    mutation UpdateRepoFavorite($isFavorite: Boolean!, $updateRepoFavoriteId: String!) {
  UpdateRepoFavorite(isFavorite: $isFavorite, id: $updateRepoFavoriteId) {
    isFavorite
    id
  }
}
    `;
export type UpdateRepoFavoriteMutationFn = Apollo.MutationFunction<UpdateRepoFavoriteMutation, UpdateRepoFavoriteMutationVariables>;

/**
 * __useUpdateRepoFavoriteMutation__
 *
 * To run a mutation, you first call `useUpdateRepoFavoriteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRepoFavoriteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRepoFavoriteMutation, { data, loading, error }] = useUpdateRepoFavoriteMutation({
 *   variables: {
 *      isFavorite: // value for 'isFavorite'
 *      updateRepoFavoriteId: // value for 'updateRepoFavoriteId'
 *   },
 * });
 */
export function useUpdateRepoFavoriteMutation(baseOptions?: Apollo.MutationHookOptions<UpdateRepoFavoriteMutation, UpdateRepoFavoriteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateRepoFavoriteMutation, UpdateRepoFavoriteMutationVariables>(UpdateRepoFavoriteDocument, options);
      }
export type UpdateRepoFavoriteMutationHookResult = ReturnType<typeof useUpdateRepoFavoriteMutation>;
export type UpdateRepoFavoriteMutationResult = Apollo.MutationResult<UpdateRepoFavoriteMutation>;
export type UpdateRepoFavoriteMutationOptions = Apollo.BaseMutationOptions<UpdateRepoFavoriteMutation, UpdateRepoFavoriteMutationVariables>;
export const GetAllRepoDocument = gql`
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

/**
 * __useGetAllRepoQuery__
 *
 * To run a query within a React component, call `useGetAllRepoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllRepoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllRepoQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetAllRepoQuery(baseOptions?: Apollo.QueryHookOptions<GetAllRepoQuery, GetAllRepoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllRepoQuery, GetAllRepoQueryVariables>(GetAllRepoDocument, options);
      }
export function useGetAllRepoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllRepoQuery, GetAllRepoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllRepoQuery, GetAllRepoQueryVariables>(GetAllRepoDocument, options);
        }
export function useGetAllRepoSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllRepoQuery, GetAllRepoQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllRepoQuery, GetAllRepoQueryVariables>(GetAllRepoDocument, options);
        }
export type GetAllRepoQueryHookResult = ReturnType<typeof useGetAllRepoQuery>;
export type GetAllRepoLazyQueryHookResult = ReturnType<typeof useGetAllRepoLazyQuery>;
export type GetAllRepoSuspenseQueryHookResult = ReturnType<typeof useGetAllRepoSuspenseQuery>;
export type GetAllRepoQueryResult = Apollo.QueryResult<GetAllRepoQuery, GetAllRepoQueryVariables>;
export const RepoByIdDocument = gql`
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

/**
 * __useRepoByIdQuery__
 *
 * To run a query within a React component, call `useRepoByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useRepoByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRepoByIdQuery({
 *   variables: {
 *      repoByIdId: // value for 'repoByIdId'
 *   },
 * });
 */
export function useRepoByIdQuery(baseOptions: Apollo.QueryHookOptions<RepoByIdQuery, RepoByIdQueryVariables> & ({ variables: RepoByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RepoByIdQuery, RepoByIdQueryVariables>(RepoByIdDocument, options);
      }
export function useRepoByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RepoByIdQuery, RepoByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RepoByIdQuery, RepoByIdQueryVariables>(RepoByIdDocument, options);
        }
export function useRepoByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<RepoByIdQuery, RepoByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<RepoByIdQuery, RepoByIdQueryVariables>(RepoByIdDocument, options);
        }
export type RepoByIdQueryHookResult = ReturnType<typeof useRepoByIdQuery>;
export type RepoByIdLazyQueryHookResult = ReturnType<typeof useRepoByIdLazyQuery>;
export type RepoByIdSuspenseQueryHookResult = ReturnType<typeof useRepoByIdSuspenseQuery>;
export type RepoByIdQueryResult = Apollo.QueryResult<RepoByIdQuery, RepoByIdQueryVariables>;
export const LoginDocument = gql`
    query Login($password: String!, $email: String!) {
  login(password: $password, email: $email)
}
    `;

/**
 * __useLoginQuery__
 *
 * To run a query within a React component, call `useLoginQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoginQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoginQuery({
 *   variables: {
 *      password: // value for 'password'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useLoginQuery(baseOptions: Apollo.QueryHookOptions<LoginQuery, LoginQueryVariables> & ({ variables: LoginQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
      }
export function useLoginLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoginQuery, LoginQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
        }
export function useLoginSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<LoginQuery, LoginQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
        }
export type LoginQueryHookResult = ReturnType<typeof useLoginQuery>;
export type LoginLazyQueryHookResult = ReturnType<typeof useLoginLazyQuery>;
export type LoginSuspenseQueryHookResult = ReturnType<typeof useLoginSuspenseQuery>;
export type LoginQueryResult = Apollo.QueryResult<LoginQuery, LoginQueryVariables>;