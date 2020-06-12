import { Action, Module, MutationAction, VuexModule } from "vuex-module-decorators";
import { $apollo } from "~/utils/getGraphQLClient";
import FindManyGroupsQueryGQL from "~/apollo/queries/groups/FindManyGroups.graphql";
import CreateGroupMutationGQL from "~/apollo/mutations/groups/CreateGroup.graphql";
import { CreateGroupMutation, CreateGroupMutationVariables, FindManyGroupsQuery } from "~/types/types";

@Module({
  name: "groups",
  stateFactory: true,
  namespaced: true
})
export default class GroupsModule extends VuexModule {
  groups: FindManyGroupsQuery["groups"] = [];

  @MutationAction({ mutate: ["groups"] })
  async fetchGroups() {
    const {
      data
    }: { data: FindManyGroupsQuery } = await $apollo.query({
      query: FindManyGroupsQueryGQL
    });

    return { groups: data?.groups ?? [] };
  }


  @Action
  async createGroup(name: string) {
    const {
      data
    }: { data?: CreateGroupMutation | null } = await $apollo.mutate({
      mutation: CreateGroupMutationGQL,
      variables: {
        name
      } as CreateGroupMutationVariables
    });

    await this.fetchGroups();
  }
}
