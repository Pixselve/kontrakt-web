import {
  Action,
  Module,
  MutationAction,
  VuexModule
} from "vuex-module-decorators";
import { $apollo } from "~/utils/getGraphQLClient";
import FetchContractsQueryGQL from "~/apollo/queries/FetchContracts.graphql";
import DeleteContractMutationGQL from "~/apollo/mutations/DeleteContract.graphql";
import CreateOneContractMutationGQL from "~/apollo/mutations/CreateOneContract.graphql";
import FindManyContractsOfGroupsQueryGQL from "~/apollo/queries/contact/FindManyContractsOfGroups.graphql";
import {
  CreateOneContractMutationVariables,
  DeleteContractMutationVariables,
  FetchContractsQuery,
  FindManyContractsOfGroupsQuery,
  FindManyContractsOfGroupsQueryVariables
} from "~/types/types";

@Module({
  name: "contracts",
  stateFactory: true,
  namespaced: true
})
export default class Contracts extends VuexModule {
  contracts: FetchContractsQuery["contracts"] = [];
  contractsOfGroups: FindManyContractsOfGroupsQuery["contracts"] = [];

  get getContracts() {
    return this.contracts;
  }

  get contractsFormattedForCalendar() {
    return this.contracts.map(({ start, end, ...restData }) => ({
      ...restData,
      start: new Date(start).toISOString().split("T")[0],
      end: new Date(end).toISOString().split("T")[0]
    }));
  }

  @MutationAction({ mutate: ["contracts"] })
  async fetchContractsOfGroups(groups: number[] = []) {
    const {
      data
    }: { data: FindManyContractsOfGroupsQuery } = await $apollo.query({
      query: FindManyContractsOfGroupsQueryGQL,
      variables: {
        groups
      } as FindManyContractsOfGroupsQueryVariables
    });
    return {
      contracts: data.contracts
    };
  }

  @MutationAction({ mutate: ["contracts"] })
  async fetchContracts() {
    const { data }: { data: FetchContractsQuery } = await $apollo.query({
      query: FetchContractsQueryGQL,
      fetchPolicy: "no-cache"
    });

    return {
      contracts: data.contracts
    };
  }

  @Action
  async deleteContract(id: number) {
    await $apollo.mutate({
      mutation: DeleteContractMutationGQL,
      variables: {
        id
      } as DeleteContractMutationVariables
    });
    await this.context.dispatch("fetchContracts");
  }

  @Action
  async addContract({
    end,
    name,
    rgb,
    start,
    skills
  }: {
    start: string;
    end: string;
    skills: string[];
    name: string;
    rgb: string;
  }) {
    await $apollo.mutate({
      mutation: CreateOneContractMutationGQL,
      variables: {
        start,
        end,
        name,
        rgb,
        skills
      } as CreateOneContractMutationVariables
    });
    await this.context.dispatch("fetchContracts");
  }
}
