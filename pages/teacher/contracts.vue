<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Les contrats de travail</h1>
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

  }
</script>
