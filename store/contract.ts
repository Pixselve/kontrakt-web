import { Action, Module, MutationAction, VuexModule } from "vuex-module-decorators";
import { $apollo }                                    from "~/utils/getGraphQLClient";
import FetchContractQueryGQL                          from "~/apollo/queries/FetchContract.graphql";
import {
  Contract, EditSkillToStudentMutationVariables,
  FetchContractQuery,
  FetchContractQueryVariables, Mark,
  Maybe,
  Skill,
  SkillToStudent,
  Student
}                                                     from "~/types/types";
import EditSkillToStudentMutationGQL                  from "~/apollo/mutations/EditSkillToStudent.graphql";

@Module({
  name: 'contract',
  stateFactory: true,
  namespaced: true,
})
export default class ContractModule extends VuexModule {
  contract: FetchContractQuery["contract"] = null;

  @MutationAction({ mutate: ["contract"] })
  async fetchContract(id: number) {
    console.log(id);
    const { data }: { data: FetchContractQuery } = await $apollo.query({
      query: FetchContractQueryGQL,
      variables: {
        id
      } as FetchContractQueryVariables,
      fetchPolicy: "no-cache"
    });
    return { contract: data.contract };
  }


  @Action
  async editMarkSkillToStudent(data: { mark: Mark, skillId: number, studentId: number }) {
    if (this.contract?.id) {
      await $apollo.mutate({
        mutation: EditSkillToStudentMutationGQL,
        variables: {
          mark: data.mark,
          studentId: data.studentId,
          skillId: data.skillId
        } as EditSkillToStudentMutationVariables
      });
      await this.context.dispatch("fetchContract", this.contract?.id);
    }

  }

}
