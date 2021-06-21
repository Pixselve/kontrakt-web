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
  })
})
export default class IndexPage extends Vue {

}
</script>
