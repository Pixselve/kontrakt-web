<template>
  <v-container>
    <v-row align="center" justify="space-between">
      <v-col>
        <h1>Les contrats de travail</h1>

      </v-col>
      <v-col>
        <v-btn color="primary" @click="generateSheetFile">Télécharger le fichier tableur</v-btn>
      </v-col>
      <v-col>
        <CreateContractDialog/>
      </v-col>

    </v-row>
    <v-row>
      <v-col>
        <v-expansion-panels>

          <contract-expansion-panel v-for="contract in contracts" :key="contract.id"
                                    :contract="contract"></contract-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
  import { Vue, Component }                from 'vue-property-decorator';
  import CreateContractDialog              from "~/components/CreateContractDialog.vue";
  import { contractsStore, studentsStore } from "~/utils/store-accessor";
  import ContractExpansionPanel            from "~/components/ContractExpansionPanel.vue";
  import GetSheetFileQueryGQL              from "~/apollo/queries/GetSheetFile.graphql";
  import { GetSheetFileQuery }             from "~/types/types";

  @Component({
    components: { CreateContractDialog, ContractExpansionPanel },
    layout: "teacher",
    head: () => ({
      title: "Les contrats"
    }),
    async asyncData() {
      await contractsStore.fetchContracts();
    }
  })
  export default class TeacherContractsPage extends Vue {
    get contracts() {
      return contractsStore.getContracts;
    }


    async generateSheetFile() {
      const { data }: { data: GetSheetFileQuery } = await this.$apollo.query({
        query: GetSheetFileQueryGQL
      });

      window.open(data.contractsToExcel, "_blank");
    }

  }
</script>
