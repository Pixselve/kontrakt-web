<template>
  <v-container>
    <v-row align="center" justify="space-between">
      <v-col>
        <h1 class="secondary--text mr-5">Mes contrats</h1>
      </v-col>
      <v-col class="text-right">
        <v-btn
          :loading="loadingDownloadSpreadsheet"
          color="secondary"
          @click="downloadSpreadsheet"
        >
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
    <v-row align="center" class="text-center" justify="center" no-gutters>
      <v-col>
        <v-btn color="grey darken-2" fab small text @click="prev">
          <v-icon small>mdi-chevron-left</v-icon>
        </v-btn>
      </v-col>
      <v-col
      ><h3>
        {{
          new Date(calendarValue).toLocaleDateString("fr-FR", {
            month: "long",
            year: "numeric",
          })
        }}
      </h3>
      </v-col>
      <v-col>
        <v-btn color="grey darken-2" fab small text @click="next">
          <v-icon small>mdi-chevron-right</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-calendar
      ref="calendar"
      v-model="calendarValue"
      :event-color="getEventColor"
      :events="contracts"
      :weekdays="[1, 2, 3, 4, 5]"
      locale="fr-FR"
      @click:event="eventClick"
    ></v-calendar>

    <v-divider class="mt-5"></v-divider>

    <v-row v-if="loading" class="text-center">
      <v-col cols="12">
        <v-progress-circular
          color="secondary"
          indeterminate
          size="64"
        ></v-progress-circular>
      </v-col>
      <v-col cols="12"> Chargement du contrat...</v-col>
    </v-row>
    <ContractDetails
      v-else-if="selectedContract"
      :id="selectedContract"
      v-on:delete="selectedContract = null"
    />

    <v-row v-else>
      <v-col cols="12">
        <v-alert type="info">Veuillez selectionner un contrat</v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Ref, Vue } from "vue-property-decorator";
import ContractsDatesOnlyQueryGQL from "~/apollo/queries/ContractsDatesOnly.graphql";
import DownloadSpreadsheetMutationGQL from "~/apollo/mutations/DownloadSpreadsheet.graphql";

import ContractSkillListItemTeacherDashboard from "~/components/ContractSkillListItemTeacherDashboard.vue";
import CreateContractDialog from "~/components/CreateContractDialog.vue";

import ContractSkillAddDialog from "~/components/contract/skill/AddDialog.vue";
import { ContractsDatesOnlyQuery, FetchContractsQuery } from "~/types/types";
import ContractDetails from "~/components/contract/ContractDetails.vue";

@Component<TeacherContractsPage>({
  layout: "teacher",
  apollo: {
    contracts: {
      query: ContractsDatesOnlyQueryGQL,
      update(data: ContractsDatesOnlyQuery) {
        return data.contracts.map((contract) => ({
          start: contract.start.split(" ")[0],
          end: contract.end.split(" ")[0],
          hexColor: contract.hexColor,
          name: contract.name,
          id: contract.id
        }));
      }
    }
  },
  components: {
    ContractDetails,
    ContractSkillListItemTeacherDashboard,
    CreateContractDialog,
    ContractSkillAddDialog,
  },
  head: () => ({
    title: "Contrats"
  }),
})
export default class TeacherContractsPage extends Vue {
  @Ref("calendar") readonly calendarRef!: any;
  contracts: ContractsDatesOnlyQuery["contracts"] = [];
  calendarValue = new Date().toISOString();
  loading = false;
  selectedContract: number | null = null;

  loadingDownloadSpreadsheet = false;

  prev() {
    this.calendarRef.prev();
  }

  next() {
    this.calendarRef.next();
  }

  async eventClick({ event }: { event: FetchContractsQuery["contracts"][0] }) {
    this.selectedContract = event.id;
  }

  getEventColor(event: FetchContractsQuery["contracts"][0]) {
    return event.hexColor;
  }

  async downloadSpreadsheet() {
    try {
      this.loadingDownloadSpreadsheet = true;
      const { data } = await this.$apollo.mutate({
        mutation: DownloadSpreadsheetMutationGQL
      });
      const downloadLink = document.createElement("a");
      downloadLink.href = data.generateSpreadsheet;
      downloadLink.download = "contrats.xlsx";
      downloadLink.click();
      downloadLink.remove();
    } catch (e) {
      alert({ e });
    } finally {
      this.loadingDownloadSpreadsheet = false;
    }
  }
}
</script>
