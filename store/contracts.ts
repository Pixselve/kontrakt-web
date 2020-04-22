import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { $apollo }                              from "~/utils/getGraphQLClient";
import FetchContractsQueryGQL
                                                from "~/apollo/queries/FetchContracts.graphql";
import DeleteContractMutationGQL                from "~/apollo/mutations/DeleteContract.graphql";
import CreateOneContractMutationGQL
                                                from "~/apollo/mutations/CreateOneContract.graphql";
import {
  Contract,
  CreateOneContractMutationVariables,
  DeleteContractMutationVariables,
  FetchContractsQuery,
  Maybe,
  Skill
}                                               from "~/types/types";

@Module({
  name: 'contracts',
  stateFactory: true,
  namespaced: true,
})
export default class Contracts extends VuexModule {
  contracts: FetchContractsQuery['contracts'] = [];

  get getContracts() {
    return this.contracts;
  }

  get todayContract() {
    return this.contracts.find(contract => new Date(contract.date) === new Date());
  }

  get laterContracts() {
    return this.contracts.filter(contract => new Date(new Date().setHours(0, 0, 0, 0)) > new Date(contract.date));

  }

  @Mutation
  setContracts(contracts: FetchContractsQuery['contracts']) {
    this.contracts = contracts;
  }

  @Action
  async fetchContracts() {
    const { data } = await $apollo.query({
      query: FetchContractsQueryGQL,
      fetchPolicy: "no-cache"
    });
    this.context.commit('setContracts', data.contracts);
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
  async addContract(contract: { date: string, skills: string[] }) {
    await $apollo.mutate({
      mutation: CreateOneContractMutationGQL,
      variables: {
        date: contract.date,
        skills: contract.skills
      } as CreateOneContractMutationVariables
    });
    await this.context.dispatch("fetchContracts");

  }
}
