import { Middleware } from "@nuxt/types";

const studentLogged: Middleware = ({ app, redirect }) => {
  if (
    app.$cookies.get("type") !== "STUDENT" ||
    !app.$apolloHelpers.getToken()
  ) {
    redirect("/login");
  }
};

export default studentLogged;
