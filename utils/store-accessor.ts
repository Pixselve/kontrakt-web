import { Store }     from 'vuex';
import { getModule } from 'vuex-module-decorators';
import Students      from "~/store/students";
import Contracts     from "~/store/contracts";
import StudentModule from "~/store/student";

let studentsStore: Students;
let contractsStore: Contracts;
let studentStore: StudentModule;

function initialiseStores(store: Store<any>): void {
  studentsStore = getModule(Students, store);
  contractsStore = getModule(Contracts, store);
  studentStore = getModule(StudentModule, store);
}

export { initialiseStores, studentsStore, contractsStore, studentStore };
