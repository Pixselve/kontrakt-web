import { Middleware } from "@nuxt/types";

const redirectAlreadyConnected: Middleware = async ({ store, app, redirect }) => {
  const type = app.$cookies.get("type");
  if (type && app.$apolloHelpers.getToken()) {
    if (type === "TEACHER") {
      redirect("/teacher/contracts");
    } else if (type === "STUDENT") {
      redirect("/student");
    }
  }


  // if (loggedUserStore.isLogged) {
  //   // If the user is connected in the app
  //   if (loggedUserStore.type === "STUDENT") {
  //     redirect("/student");
  //   } else if (loggedUserStore.type === "TEACHER") {
  //     redirect("/teacher/contracts");
  //   }
  // } else if (app.$apolloHelpers.getToken()) {
  //   // If the user is connected though the cookie but not in the app
  //
  //   //  Get the user infos
  //   try {
  //     const { data }: { data: MeQuery } = await $apollo.query({
  //       query: MeQueryGQL
  //     });
  //
  //     if (data.me.teacher) {
  //       //  The user is a teacher
  //
  //
  //       loggedUserStore.login("TEACHER");
  //
  //
  //       redirect("/teacher/contracts");
  //     } else {
  //       //  The user is a student
  //
  //       loggedUserStore.login("STUDENT");
  //
  //       redirect("/student");
  //     }
  //   } catch (e) {
  //     console.log({ e });
  //     await app.$apolloHelpers.onLogout();
  //     return loggedUserStore.logout();
  //   }
  // }
};

export default redirectAlreadyConnected;
