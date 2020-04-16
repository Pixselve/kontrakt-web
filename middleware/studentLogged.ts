import { Middleware }                  from '@nuxt/types';
import { studentsStore, studentStore } from "~/utils/store-accessor";

const studentLogged: Middleware = (context) => {
  if (studentStore.studentId === undefined) {
    return context.redirect("/login");
  }

};

export default studentLogged;
