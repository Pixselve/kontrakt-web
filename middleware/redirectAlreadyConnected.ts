import { Middleware } from "@nuxt/types";
import { StatusQuery } from "~/types/types";
import { $apollo } from "~/utils/getGraphQLClient";
import StatusQueryGQL from "~/apollo/queries/Status.graphql";

const redirectAlreadyConnected: Middleware = async ({ store, app, redirect }) => {
  const type = app.$cookies.get("role");
  if (type && app.$apolloHelpers.getToken()) {
    if (type === "TEACHER") {
      redirect("/teacher/contracts");
    } else if (type === "STUDENT") {
      redirect("/student");
    }
  }
};

export default redirectAlreadyConnected;
