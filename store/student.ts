import { Action, Module, Mutation, MutationAction, VuexModule } from "vuex-module-decorators";
import {
  DeleteStudentMutationVariables,
  EditSkillToStudentMutationVariables,
  FetchContractsAwaitingFinishStudentQuery,
  FetchContractsAwaitingFinishStudentQueryVariables,
  FetchStudentQuery,
  Mark,
  Maybe,
  MeQuery,
  Skill,
  SkillToStudent
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
  id: number | null = null;
  firstName: string | null = null;
  lastName: string | null = null;
  skillToStudents: Array<{ __typename?: "SkillToStudent" } & Pick<SkillToStudent, "mark"> & {
    skill?: Maybe<{ __typename?: "Skill" } & Pick<Skill, "id">>;
  }> = [];
  contractsNeededToBeFinished: FetchContractsAwaitingFinishStudentQuery["contracts"] = [];

  get student(): FetchStudentQuery["student"] | null {
    if (this.id && this.firstName && this.lastName && this.skillToStudents) {
      return {
        firstName: this.firstName,
        lastName: this.lastName,
        id: this.id,
        skillToStudents: this.skillToStudents
      };
    } else {
      return null;
    }
  }

  get studentId() {
    return this.id;
  }

  get getContractsNeededToBeFinished() {
    return this.contractsNeededToBeFinished;
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
    this.id = null;
    this.firstName = null;
    this.lastName = null;
    this.skillToStudents = [];
    this.contractsNeededToBeFinished = [];
  }

  @Action
  async editMarkSkillToStudent(data: { mark: Mark; skillId: number }) {
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
  async setStudent(data: FetchStudentQuery["student"]) {
    if (data && data.skillToStudents) {
      const { id, lastName, firstName, skillToStudents } = data;
      this.id = id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.skillToStudents = skillToStudents;
    }
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

  @MutationAction({
    mutate: ["id", "firstName", "lastName", "skillToStudents"]
  })
  async fetchMe() {
    const { data }: { data: MeQuery } = await $apollo.query({
      query: MeQueryGQL,
      fetchPolicy: "no-cache"
    });

    return {
      id: data.me.student?.id,
      firstName: data.me.student?.firstName,
      lastName: data.me.student?.lastName,
      skillToStudents: data.me.student?.skillToStudents
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
    return { contractsNeededToBeFinished: data.contracts };
  }

}
