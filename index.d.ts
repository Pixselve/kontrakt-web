import Vue              from 'vue';
import VueRouter        from 'vue-router';
import { ApolloClient } from 'apollo-client';

declare module '*.vue' {
  const _default: Vue;
  export default _default;
}


declare module 'vue/types/vue' {
  interface Vue {
    $router: VueRouter,
    $apolloHelpers: {
      onLogin(token: string, apolloClient?: ApolloClient<{}>, tokenExpires?: number): Promise<void>;
      onLogout(apolloClient?: ApolloClient<{}>): Promise<void>;
      getToken(tokenName?: string): string;
    }
  }
}
