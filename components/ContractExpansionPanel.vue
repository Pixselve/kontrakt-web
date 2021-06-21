<template>
  <v-expansion-panel :disabled="loading">
    <v-progress-linear v-if="loading" indeterminate></v-progress-linear>
    <v-expansion-panel-header>{{contract.date | formatDate}}</v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-list-item v-for="skill in contract.skills" :key="skill.id">
        <v-list-item-content>
          <v-list-item-subtitle>{{skill.name}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-btn :to="`/teacher/contracts/${contract.id}`" text color="primary">Compléter les compétences</v-btn>
      <v-btn :disabled="loading" @click="deleteContract" text color="red">Supprimer le contrat</v-btn>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import { Contract }             from "~/types/types";

  @Component({
    filters: {
      formatDate(value: string) {
        return new Date(value).toLocaleDateString("fr-FR", { day: "numeric", month: "long" });
      }
    }
  })
  export default class ContractExpansionPanel extends Vue {
    @Prop({ type: Object }) readonly contract!: Contract;
    loading = false;

    async deleteContract() {
      //TODO
      // try {
      //   this.loading = true;
      //   await contractsStore.deleteContract(this.contract.id);
      // } catch ( e ) {
      //   alert("Une erreur est survenue lors de la suppression du contrat");
      //   console.log({ e });
      // } finally {
      //   this.loading = false;
      // }
    }
  }
</script>
