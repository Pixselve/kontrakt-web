import { Middleware } from "@nuxt/types";

const studentLogged: Middleware = ({ app, redirect }) => {
  if (
    app.$cookies.get("role") !== "STUDENT" ||
    !app.$apolloHelpers.getToken()
  ) {
    redirect("/login");
  }
};

export default studentLogged;
