import { Middleware } from "@nuxt/types";

const TeacherLogged: Middleware = ({ app, redirect }) => {
  // Check if a teacher is connected
  if (
    app.$cookies.get("role") !== "TEACHER" ||
    !app.$apolloHelpers.getToken()
  ) {
    redirect("/login");
  }
};

export default TeacherLogged;
