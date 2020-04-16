import ApolloClient from "apollo-client";

let $apollo: ApolloClient<any>;

export function initializeApollo(apolloClient: ApolloClient<any>): void {
  $apollo = apolloClient;
}

export { $apollo };
