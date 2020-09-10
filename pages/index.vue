<template>
  <v-container>
    <v-alert type="info">L'application n'a pas encore été ouverte ou a été temporairement interrompue</v-alert>
  </v-container>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { $apollo } from "~/utils/getGraphQLClient";
import StatusQueryGQL from "~/apollo/queries/Status.graphql";
import { StatusQuery } from "~/types/types";

@Component({
  layout: "login",
  head: () => ({
    title: "Application fermée"
  }),
  async validate({ redirect }): Promise<boolean> {
    const { data }: { data: StatusQuery } = await $apollo.query({
      query: StatusQueryGQL
    });
    if (data.status === 1) {
      redirect("/login");
      return false;
    } else {
      return true;
    }
  }
})
export default class IndexPage extends Vue {

}
</script>
