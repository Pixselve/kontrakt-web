import { Middleware } from "@nuxt/types";
import { StatusQuery } from "~/types/types";
import { $apollo } from "~/utils/getGraphQLClient";
import StatusQueryGQL from "~/apollo/queries/Status.graphql";

const redirectAlreadyConnected: Middleware = async ({ store, app, redirect }) => {
  const type = app.$cookies.get("type");
  if (type && app.$apolloHelpers.getToken()) {
    if (type === "TEACHER") {
      redirect("/teacher/contracts");
    } else if (type === "STUDENT") {
      redirect("/student");
    }
  } else {
    const { data }: { data: StatusQuery } = await $apollo.query({
      query: StatusQueryGQL
    });
    if (data.status !== 1) {
      redirect("/");
    }
  }
};

export default redirectAlreadyConnected;
