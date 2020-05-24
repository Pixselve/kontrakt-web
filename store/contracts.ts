import { Action, Module, MutationAction, VuexModule } from "vuex-module-decorators";
import { $apollo } from "~/utils/getGraphQLClient";
import FetchContractsQueryGQL from "~/apollo/queries/FetchContracts.graphql";
import DeleteContractMutationGQL from "~/apollo/mutations/DeleteContract.graphql";
import CreateOneContractMutationGQL from "~/apollo/mutations/CreateOneContract.graphql";
import {
  CreateOneContractMutationVariables,
  DeleteContractMutationVariables,
  FetchContractsQuery,
  Maybe,
  Scalars,
  Skill
} from "~/types/types";


const colors = ["red", "pink", "purple", "indigo", "blue", "cyan", "teal", "green", "orange", "brown"];


export interface FetchContractQueryWithColor {
  date: Scalars["DateTime"];
  skills?: Maybe<Array<{ __typename?: "Skill" } & Pick<Skill, "id" | "name">>>;
  color: string;
  __typename?: "Contract";
  name: Scalars["String"];
  end: Scalars["DateTime"];
  id: Scalars["Int"]
}


function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}


@Module({
  name: 'contracts',
  stateFactory: true,
  namespaced: true,
})
export default class Contracts extends VuexModule {


  contracts: FetchContractQueryWithColor[] = [];

  get getContracts() {
    return this.contracts;
  }

  get contractsFormattedForCalendar() {
    return this.contracts.map(({ date, end, ...restData }) => ({
      ...restData,
      start: new Date(date).toISOString().split("T")[0],
      end: new Date(end).toISOString().split("T")[0]
    }));
  }


  @MutationAction({ mutate: ["contracts"] })
  async fetchContracts() {
    const { data }: { data: FetchContractsQuery } = await $apollo.query({
      query: FetchContractsQueryGQL,
      fetchPolicy: "no-cache"
    });

    return { contracts: data.contracts.map(contract => ({ ...contract, color: getRandomColor() })) };
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
  async addContract(contract: { start: string, end: string, skills: string[], name: string }) {
    await $apollo.mutate({
      mutation: CreateOneContractMutationGQL,
      variables: {
        date: contract.start,
        end: contract.end,
        skills: contract.skills,
        name: contract.name
      } as CreateOneContractMutationVariables
    });
    await this.context.dispatch("fetchContracts");

  }
}
