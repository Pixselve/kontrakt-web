import {
  Action,
  Module,
  Mutation,
  MutationAction,
  VuexModule
} from "vuex-module-decorators";
import {
  DeleteStudentMutationVariables,
  EditSkillToStudentMutationVariables,
  FetchContractsAwaitingFinishStudentQuery,
  FetchContractsAwaitingFinishStudentQueryVariables,
  FetchStudentQuery,
  FetchStudentQueryVariables,
  MeQuery
} from "~/types/types";
import { $apollo } from "~/utils/getGraphQLClient";
import FetchStudentQueryGQL from "~/apollo/queries/FetchStudent.graphql";
import DeleteStudentMutationGQL from "~/apollo/mutations/DeleteStudent.graphql";
import MeQueryGQL from "~/apollo/queries/Me.graphql";

import EditSkillToStudentMutationGQL from "~/apollo/mutations/EditSkillToStudent.graphql";

import FetchContractsAwaitingFinishStudentQueryGQL from "~/apollo/queries/FetchContractsAwaitingFinishStudent.graphql";

@Module({
  name: "student",
  stateFactory: true,
  namespaced: true
})
export default class TeacherStudentModule extends VuexModule {
  student: FetchStudentQuery["student"] | null = null;
  contractsNeededToBeFinished: FetchContractsAwaitingFinishStudentQuery["findManyContractNotFinishedByStudent"] = [];

  get studentId() {
    return this.student?.id;
  }

  get skillsCountNeededToBeFinished() {
    let result = 0;
    this.contractsNeededToBeFinished.forEach(contract =>
      contract.skills ? (result += contract.skills.length) : (result += 0)
    );
    return result;
  }

  @Mutation
  /**
   * Logout the current student
   */
  logout() {
    this.student = null;
    this.contractsNeededToBeFinished = [];
  }

  @Action
  async editMarkSkillToStudent(data: { markValue: String; skillId: number }) {
    await $apollo.mutate({
      mutation: EditSkillToStudentMutationGQL,
      variables: {
        studentId: this.studentId,
        skillId: data.skillId,
        markValue: data.markValue
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
  async setStudent(data: FetchStudentQuery["student"]) {
    if (data && data.skillsToStudent) {
      this.student = data;
    }
  }

  @Action
  async fetchStudent(id: number) {
    const { data }: { data: FetchStudentQuery } = await $apollo.query({
      query: FetchStudentQueryGQL,
      variables: {
        id
      } as FetchStudentQueryVariables,
      fetchPolicy: "no-cache"
    });
    this.context.commit("setStudent", data.student);
  }

  @MutationAction({
    mutate: ["student"]
  })
  async fetchMe() {
    const { data }: { data: MeQuery } = await $apollo.query({
      query: MeQueryGQL,
      fetchPolicy: "no-cache"
    });

    return {
      student: data.me
    };
  }

  @MutationAction({ mutate: ["contractsNeededToBeFinished"] })
  async fetchAwaitingToFinishContracts(id: number) {
    const {
      data
    }: { data: FetchContractsAwaitingFinishStudentQuery } = await $apollo.query(
      {
        query: FetchContractsAwaitingFinishStudentQueryGQL,
        variables: {
          studentId: id
        } as FetchContractsAwaitingFinishStudentQueryVariables
      }
    );
    return {
      contractsNeededToBeFinished: data.findManyContractNotFinishedByStudent
    };
  }
}
