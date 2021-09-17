import { Middleware } from "@nuxt/types";

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
