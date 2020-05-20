import { Middleware } from "@nuxt/types";

const TeacherLogged: Middleware = ({ app, redirect }) => {
  // Check if a teacher is connected
  if (
    app.$cookies.get("type") !== "TEACHER" ||
    !app.$apolloHelpers.getToken()
  ) {
    redirect("/teacher/login");
  }
};

export default TeacherLogged;
