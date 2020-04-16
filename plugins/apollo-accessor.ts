import { Plugin }           from '@nuxt/types';
import { initializeApollo } from "~/utils/getGraphQLClient";

const accessor: Plugin = ({ app }) => {
  if (app.apolloProvider) {
    const { defaultClient } = app.apolloProvider;
    initializeApollo(defaultClient);
  }
};

export default accessor;
