import { Store } from "vuex";
import { getModule } from "vuex-module-decorators";
import Students from "~/store/students";
import Contracts from "~/store/contracts";
import TeacherStudentModule from "~/store/student";
import ContractModule from "~/store/contract";
import StudentModule from "~/store/student";
import LoggedUserModule from "~/store/loggedUser";

let studentsStore: Students;
let contractsStore: Contracts;
let studentStore: TeacherStudentModule;
let contractStore: ContractModule;
let loggedUserStore: LoggedUserModule;

function initialiseStores(store: Store<any>): void {
  studentsStore = getModule(Students, store);
  contractsStore = getModule(Contracts, store);
  studentStore = getModule(TeacherStudentModule, store);
  contractStore = getModule(ContractModule, store);
  loggedUserStore = getModule(LoggedUserModule, store);
}

export {
  initialiseStores,
  studentsStore,
  contractsStore,
  contractStore,
  studentStore,
  loggedUserStore
};
