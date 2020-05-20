<template>
  <v-container>
    <v-row align="center" justify="space-between">
      <v-col>
        <h1 class="secondary--text mr-5">
          Mes contracts
          <v-chip color="secondary">BETA</v-chip>
        </h1>
      </v-col>
      <v-col class="text-right">
        <v-btn color="secondary" @click="generateSheetFile">
          <v-icon left>mdi-file</v-icon>
          Télécharger le fichier tableur
        </v-btn>
        <create-contract-dialog>
          <template v-slot="{ on }">
            <v-btn color="secondary" v-on="on">
              <v-icon left>mdi-playlist-plus</v-icon>
              Ajouter un contrat
            </v-btn>
          </template>
        </create-contract-dialog>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-date-picker
      @change="fetchSelectedContract"
      class="mt-6"
      header-color="secondary"
      locale="fr-FR"
      min="2020"
      v-model="date"
      event-color="secondary"
      :allowed-dates="allowedDates"
      :events="allowedDates"
      show-current
      landscape
      full-width
    ></v-date-picker>
    <v-row class="text-center" v-if="loading">
      <v-col cols="12">
        <v-progress-circular
          color="secondary"
          indeterminate
          size="64"
        ></v-progress-circular>
      </v-col>
      <v-col cols="12">
        Chargement du contrat...
      </v-col>
    </v-row>
    <v-row v-else-if="!loading && selectedContract">
      <!--      <v-col v-for="i in 3">-->
      <!--        <v-card>-->
      <!--          <v-card-title>Élèves ayant terminé le contrat</v-card-title>-->
      <!--          <v-card-text class="text-center">-->
      <!--            <v-progress-circular size="100" width="10" value="95" color="red"-->
      <!--            ><h2>25%</h2></v-progress-circular-->
      <!--            >-->
      <!--          </v-card-text>-->
      <!--        </v-card>-->
      <!--      </v-col>-->
      <v-col cols="12">
        <v-list>
          <contract-skill-list-item-teacher-dashboard
            :skill="skill"
            v-for="skill in selectedContract.skills"
            :key="skill.id"
          ></contract-skill-list-item-teacher-dashboard>
        </v-list>
      </v-col>
      <v-col cols="12">
        <contract-skill-add-dialog>
          <template v-slot:default="{on}">
            <v-btn v-on="on" text color="green">
              <v-icon left>mdi-playlist-plus</v-icon>
              Ajouter une compétence
            </v-btn>
          </template>
        </contract-skill-add-dialog>

        <v-btn
          :to="`/teacher/contracts/${selectedContract.id}`"
          text
          color="secondary"
        >
          <v-icon left>mdi-playlist-edit</v-icon>
          Compléter les compétences
        </v-btn>
        <v-btn
          :loading="loadingDeletion"
          @click="deleteContract"
          text
          color="red"
        >
          <v-icon left>mdi-delete</v-icon>
          Supprimer le contrat
        </v-btn>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12">
        <v-alert type="info">Veuillez selectionner un contrat</v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { contractStore } from "~/utils/store-accessor";
import { ContractsDatesOnlyQuery, GetSheetFileQuery } from "~/types/types";
import { $apollo } from "~/utils/getGraphQLClient";

import ContractsDatesOnlyQueryGQL from "~/apollo/queries/ContractsDatesOnly.graphql";
import ContractSkillListItemTeacherDashboard from "~/components/ContractSkillListItemTeacherDashboard.vue";
import CreateContractDialog from "~/components/CreateContractDialog.vue";
import GetSheetFileQueryGQL from "~/apollo/queries/GetSheetFile.graphql";
import ContractSkillAddDialog from "~/components/contract/skill/AddDialog.vue";

@Component({
  layout: "teacher",
  async asyncData() {
    const { data }: { data: ContractsDatesOnlyQuery } = await $apollo.query({
      query: ContractsDatesOnlyQueryGQL
    });
    return { contractsOnlyDates: data.contracts };
  },
  components: {
    ContractSkillListItemTeacherDashboard,
    CreateContractDialog,
    ContractSkillAddDialog
  }
})
export default class TeacherContractsPageBeta extends Vue {
  date: null | string = this.alreadyPresentDate;


  get alreadyPresentDate() {
    if (contractStore?.contract?.date) {
      return new Date(contractStore.contract?.date).toISOString().replace(/T.+/g, "");
    } else {
      return null;
    }
  }


  get selectedContract() {
    return contractStore.contract;
  }

  contractsOnlyDates: ContractsDatesOnlyQuery["contracts"] = [];

  loading = false;
  loadingDeletion = false;

  async fetchSelectedContract() {
    try {
      this.loading = true;
      if (this.date === null) throw new Error("NoSelectedContract");
      await contractStore.fetchContractByDate(new Date(this.date));
    } catch (e) {
    } finally {
      this.loading = false;
    }
  }

  allowedDates(date: string): boolean {
    return !!this.contractsDates.find(
      contractDate =>
        contractDate.getDate() === new Date(date).getDate() &&
        contractDate.getMonth() === new Date(date).getMonth() &&
        contractDate.getFullYear() === new Date(date).getFullYear()
    );
  }

  get contractsDates(): Date[] {
    return this.contractsOnlyDates.map(
      contract => new Date(new Date(contract.date).setHours(0, 0, 0, 0))
    );
  }

  async deleteContract() {
    try {
      if (!this.selectedContract) throw new Error("");
      this.loadingDeletion = true;
      await contractStore.deleteContract();
    } catch (e) {
      alert("Une erreur est survenue lors de la suppression du contrat");
      console.log({ e });
    } finally {
      this.loadingDeletion = false;
    }
  }

  async generateSheetFile() {
    const { data }: { data: GetSheetFileQuery } = await this.$apollo.query({
      query: GetSheetFileQueryGQL
    });

    window.open(data.contractsToExcel, "_blank");
  }
}
</script>
