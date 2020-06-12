import { Store } from "vuex";
import { getModule } from "vuex-module-decorators";
import Students from "~/store/students";
import Contracts from "~/store/contracts";
import TeacherStudentModule from "~/store/student";
import ContractModule from "~/store/contract";
import LoggedUserModule from "~/store/loggedUser";
import GroupsModule from "~/store/groups";
import MarksModule from "~/store/marks";

let studentsStore: Students;
let contractsStore: Contracts;
let studentStore: TeacherStudentModule;
let contractStore: ContractModule;
let loggedUserStore: LoggedUserModule;
let groupsStore: GroupsModule;
let marksStore: MarksModule;

function initialiseStores(store: Store<any>): void {
  studentsStore = getModule(Students, store);
  contractsStore = getModule(Contracts, store);
  studentStore = getModule(TeacherStudentModule, store);
  contractStore = getModule(ContractModule, store);
  loggedUserStore = getModule(LoggedUserModule, store);
  groupsStore = getModule(GroupsModule, store);
  marksStore = getModule(MarksModule, store);
}

export {
  initialiseStores,
  studentsStore,
  contractsStore,
  contractStore,
  studentStore,
  loggedUserStore,
  groupsStore,
  marksStore
};
