<template>
  <v-container>
    <v-alert type="info">L'application n'a pas encore été ouverte ou a été temporairement interrompue</v-alert>
  </v-container>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component<IndexPage>({
  layout: "login",
  asyncData({ redirect }) {
    redirect("/login");
  },
  head: () => ({
    title: "Kontrakt"
  }),
})
export default class IndexPage extends Vue {

}
</script>
