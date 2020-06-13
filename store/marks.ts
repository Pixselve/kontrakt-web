import { Module, MutationAction, VuexModule } from "vuex-module-decorators";
import { $apollo } from "~/utils/getGraphQLClient";
import FetchMarksQueryGQL from "~/apollo/queries/marks/FetchMarks.graphql";
import { FetchMarksQuery } from "~/types/types";


@Module({
  name: "marks",
  stateFactory: true,
  namespaced: true
})
export default class MarksModule extends VuexModule {
  marks: FetchMarksQuery["marks"] = [];

  @MutationAction({ mutate: ["marks"] })
  async fetchMarks() {
    const {
      data
    }: { data: FetchMarksQuery } = await $apollo.query({
      query: FetchMarksQueryGQL
    });

    return { marks: data?.marks ?? [] };
  }

}
