import { Middleware }                  from '@nuxt/types';
import { studentsStore, studentStore } from "~/utils/store-accessor";

const studentLogged: Middleware = (context) => {
  if (studentStore.studentId === null) {
    return context.redirect("/login");
  }

};

export default studentLogged;
