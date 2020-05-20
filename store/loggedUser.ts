import { Module, Mutation, VuexModule } from "vuex-module-decorators";

@Module({
  name: 'loggedUser',
  stateFactory: true,
  namespaced: true,
})
export default class LoggedUserModule extends VuexModule {
  get isLogged(): boolean {
    return this.isLoggedD;
  }

  get type(): "TEACHER" | "STUDENT" | null {
    return this.typeD;
  }

  isLoggedD = false;
  typeD: "TEACHER" | "STUDENT" | null = null;


  @Mutation
  login(type: "TEACHER" | "STUDENT") {
    console.log("LOGIN");
    this.isLoggedD = true;
    this.typeD = type;
  }

  @Mutation
  logout() {
    this.isLoggedD = false;
    this.typeD = null;
  }


}
