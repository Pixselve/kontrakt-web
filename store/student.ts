import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import {
  DeleteStudentMutationVariables,
  EditSkillToStudentMutationVariables,
  FetchStudentQuery,
  Mark,
  SkillToStudent,
  Student
}                                               from "~/types/types";
import { $apollo }                              from "~/utils/getGraphQLClient";
import FetchStudentQueryGQL
                                                from "~/apollo/queries/FetchStudent.graphql";
import DeleteStudentMutationGQL                 from "~/apollo/mutations/DeleteStudent.graphql";


import EditSkillToStudentMutationGQL
  from "~/apollo/mutations/EditSkillToStudent.graphql";

@Module({
  name: 'student',
  stateFactory: true,
  namespaced: true,
})
export default class StudentModule extends VuexModule {
  id: number | null | undefined;
  firstName: string | null | undefined;
  lastName: string | null | undefined;
  skillToStudents: Array<SkillToStudent> | null | undefined;

  get student(): Student | null {
    if (this.id && this.firstName && this.lastName) {
      return { firstName: this.firstName, lastName: this.lastName, id: this.id, skillToStudents: this.skillToStudents };
    } else {
      return null;
    }
  }

  get studentId() {
    return this.id;
  }


  @Action
  async editMarkSkillToStudent(data: {mark: Mark, skillId: number}) {
    await $apollo.mutate({
      mutation: EditSkillToStudentMutationGQL,
      variables: {
        mark: data.mark,
        studentId: this.studentId,
        skillId: data.skillId
      } as EditSkillToStudentMutationVariables
    });
    await this.context.dispatch("fetchStudent", this.studentId);
  }

  @Action
  async deleteStudent() {
    await $apollo.mutate({
      mutation: DeleteStudentMutationGQL,
      variables: {
        id: this.studentId
      } as DeleteStudentMutationVariables
    });
  }

  @Mutation
  async setStudent(data: Student) {
    const { id, lastName, firstName, skillToStudents } = data;
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.skillToStudents = skillToStudents;
  }

  @Action
  async fetchStudent(id: number) {
    const { data }: { data: FetchStudentQuery } = await $apollo.query({
      query: FetchStudentQueryGQL,
      variables: {
        id
      } as FetchStudentQuery,
      fetchPolicy: "no-cache"
    });
    this.context.commit("setStudent", data.student);
  }
}
