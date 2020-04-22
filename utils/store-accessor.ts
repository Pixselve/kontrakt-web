import { Store }     from 'vuex';
import { getModule } from 'vuex-module-decorators';
import Students      from "~/store/students";
import Contracts     from "~/store/contracts";
import StudentModule from "~/store/student";
import ContractModule      from "~/store/contract";

let studentsStore: Students;
let contractsStore: Contracts;
let studentStore: StudentModule;
let contractStore: ContractModule;

function initialiseStores(store: Store<any>): void {
  studentsStore = getModule(Students, store);
  contractsStore = getModule(Contracts, store);
  studentStore = getModule(StudentModule, store);
  contractStore = getModule(ContractModule, store);
}

export { initialiseStores, studentsStore, contractsStore, studentStore, contractStore };
