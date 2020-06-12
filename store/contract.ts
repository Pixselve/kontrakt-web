import {
  Action,
  Module,
  MutationAction,
  VuexModule
} from "vuex-module-decorators";
import { $apollo } from "~/utils/getGraphQLClient";
import FetchContractQueryGQL from "~/apollo/queries/FetchContract.graphql";
import {
  CreateOneSkillToContractMutation,
  CreateOneSkillToContractMutationVariables,
  DeleteContractMutationVariables,
  DeleteSkillMutation,
  DeleteSkillMutationVariables,
  EditSkillNameMutation,
  EditSkillNameMutationVariables,
  EditSkillToStudentMutationVariables,
  FetchContractQuery,
  FetchContractQueryVariables,
  UpdateContractGroupsMutation,
  UpdateContractGroupsMutationVariables
} from "~/types/types";
import EditSkillToStudentMutationGQL from "~/apollo/mutations/EditSkillToStudent.graphql";
import EditSkillNameMutationGQL from "~/apollo/mutations/skill/EditSkillName.graphql";
import DeleteContractMutationGQL from "~/apollo/mutations/DeleteContract.graphql";
import CreateOneSkillToContractMutationGQL from "~/apollo/mutations/skill/CreateOneSkillToContract.graphql";
import DeleteSkillMutationGQL from "~/apollo/mutations/skill/DeleteSkill.graphql";
import UpdateContractGroupsMutationGQL from "~/apollo/mutations/contract/UpdateContractGroups.graphql";

@Module({
  name: "contract",
  stateFactory: true,
  namespaced: true
})
export default class ContractModule extends VuexModule {
  contract: FetchContractQuery["contract"] | null = null;

  get contractID(): number | null {
    return this.contract?.id ?? null;
  }

  @MutationAction({ mutate: ["contract"] })
  async fetchContract(id: number) {
    const { data }: { data: FetchContractQuery } = await $apollo.query({
      query: FetchContractQueryGQL,
      variables: {
        id
      } as FetchContractQueryVariables,
      fetchPolicy: "no-cache"
    });
    return { contract: data.contract };
  }

  @MutationAction({ mutate: ["contract"] })
  async updateGroups(groupIds: number[]) {
    const {
      data
    }: { data: UpdateContractGroupsMutation } = await $apollo.query({
      query: UpdateContractGroupsMutationGQL,
      variables: {
        contractId: this.getters?.contractID as unknown,
        groups: groupIds
      } as UpdateContractGroupsMutationVariables,
      fetchPolicy: "no-cache"
    });
    return { contract: data.updateOneContract };
  }

  @MutationAction({ mutate: ["contract"] })
  async deleteContract() {
    if (this.contract?.id === null) {
      throw new Error("NoContractSet");
    } else {
      await $apollo.mutate({
        mutation: DeleteContractMutationGQL,
        variables: {
          id: (this.getters?.contractID as unknown) as number
        } as DeleteContractMutationVariables
      });
      return { contract: null };
    }
  }

  @MutationAction({ mutate: ["contract"] })
  async editSkillById(input: { id: number; newName: string }) {
    const {
      data
    }: {
      data?: EditSkillNameMutation | undefined | null;
    } = await $apollo.mutate({
      mutation: EditSkillNameMutationGQL,
      variables: {
        id: input.id,
        name: input.newName
      } as EditSkillNameMutationVariables
    });
    return { contract: data?.updateOneSkill?.contract ?? null };
  }

  @MutationAction({ mutate: ["contract"] })
  async addSkillToContract(name: string) {
    if (this.getters?.contractID) {
      const {
        data
      }: {
        data?: CreateOneSkillToContractMutation | undefined | null;
      } = await $apollo.mutate({
        mutation: CreateOneSkillToContractMutationGQL,
        variables: ({
          name,
          contractID: this.getters.contractID
        } as unknown) as CreateOneSkillToContractMutationVariables
      });
      return { contract: data?.createOneSkill?.contract ?? null };
    } else {
      throw new Error("ContractNotSet");
    }
  }

  @Action
  async deleteSkill(id: number) {
    const {
      data
    }: {
      data?: DeleteSkillMutation | undefined | null;
    } = await $apollo.mutate({
      mutation: DeleteSkillMutationGQL,
      variables: {
        id
      } as DeleteSkillMutationVariables
    });

    await this.context.dispatch("fetchContract", this.contract?.id);
  }

  @Action
  async editMarkSkillToStudent(data: {
    markValue: string;
    skillId: number;
    studentId: number;
  }) {
    if (this.contract?.id) {
      await $apollo.mutate({
        mutation: EditSkillToStudentMutationGQL,
        variables: {
          studentId: data.studentId,
          skillId: data.skillId,
          markValue: data.markValue
        } as EditSkillToStudentMutationVariables
      });
      await this.context.dispatch("fetchContract", this.contract?.id);
    }
  }
}
