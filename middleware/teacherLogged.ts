import { Middleware }    from '@nuxt/types';
import { studentsStore } from "~/utils/store-accessor";

const TeacherLogged: Middleware = ({ app, redirect }) => {
  // Check if a teacher is connected
  const hasToken = !!app.$apolloHelpers.getToken();
  if (!hasToken) {
    redirect("/login");
  }

};

export default TeacherLogged;
