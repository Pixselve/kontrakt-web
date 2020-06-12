import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { $apollo } from "~/utils/getGraphQLClient";
import FetchStudentsQueryGQL from "~/apollo/queries/FetchStudents.graphql";
import FetchStudentQueryGQL from "~/apollo/queries/FetchStudent.graphql";
import AddStudentMutationGQL from "~/apollo/mutations/AddStudent.graphql";
import {
  AddStudentMutationVariables,
  FetchContractsQuery,
  FetchStudentQuery,
  FetchStudentsQuery, UpdateStudentGroupsMutation, UpdateStudentGroupsMutationVariables
} from "~/types/types";
import UpdateStudentGroupsMutationGQL from "~/apollo/mutations/student/UpdateStudentGroups.graphql";

@Module({
  name: "students",
  stateFactory: true,
  namespaced: true
})
export default class Students extends VuexModule {
  students: FetchStudentsQuery["students"] = [];

  get studentsComboboxFormatted() {
    return this.students.map(({ firstName, lastName, id }) => ({
      text: `${lastName} ${firstName}`,
      value: id
    }));
  }

  get allStudents() {
    return this.students;
  }

  @Mutation
  setStudents(students: FetchStudentsQuery["students"]) {
    this.students = students;
  }

  @Action
  async fetchStudents() {
    const { data }: { data: FetchStudentsQuery } = await $apollo.query({
      query: FetchStudentsQueryGQL,
      fetchPolicy: "no-cache"
    });

    this.context.commit("setStudents", data.students);
  }

  @Action
  async addStudent(data: AddStudentMutationVariables) {
    const { lastName, firstName } = data;
    await $apollo.mutate({
      mutation: AddStudentMutationGQL,
      variables: {
        firstName: firstName,
        lastName: lastName
      } as AddStudentMutationVariables
    });

    await this.context.dispatch("fetchStudents");
  }


  @Action
  async editStudentGroups({ groupIds, studentId }: {groupIds: number[], studentId: number}) {
    const { data }: { data?: UpdateStudentGroupsMutation | null } = await $apollo.mutate({
      mutation: UpdateStudentGroupsMutationGQL,
      variables: {
        studentId: studentId,
        groups: groupIds
      } as UpdateStudentGroupsMutationVariables
    });
    await this.context.dispatch("fetchStudents");
  }

}
