import { Middleware }                  from '@nuxt/types';
import { studentsStore, studentStore } from "~/utils/store-accessor";
import { $apollo }                     from "~/utils/getGraphQLClient";

const redirectAlreadyConnected: Middleware = ({ app, redirect }) => {
  if (!!app.$apolloHelpers.getToken()) {
    return redirect("/teacher/contracts");
  }

};

export default redirectAlreadyConnected;
