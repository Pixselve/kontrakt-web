<template>
  <v-container>
    <v-row align="center" justify="space-between">
      <v-col>
        <h1 class="secondary--text mr-5">
          Mes contracts
        </h1>
      </v-col>
      <v-col class="text-right">
        <v-tooltip bottom>
          <template v-slot:activator="{on}">
            <v-btn v-on="on"  color="secondary" @click="generateSheetFile">
              <v-icon left>mdi-file</v-icon>
              Télécharger le fichier tableur
            </v-btn>
          </template>
          Non implémenté dans cette version
        </v-tooltip>



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
    <v-row no-gutters class="text-center" justify="center" align="center">
      <v-col>
        <v-btn fab text small color="grey darken-2" @click="prev">
          <v-icon small>mdi-chevron-left</v-icon>
        </v-btn>
      </v-col>
      <v-col
        ><h3>
          {{
            new Date(calendarValue).toLocaleDateString("fr-FR", {
              month: "long",
              year: "numeric"
            })
          }}
        </h3>
      </v-col>
      <v-col>
        <v-btn fab text small color="grey darken-2" @click="next">
          <v-icon small>mdi-chevron-right</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-calendar
      :weekdays="[1, 2, 3, 4, 5]"
      locale="fr-FR"
      ref="calendar"
      v-model="calendarValue"
      :events="contractsFormattedForCalendar"
      @click:event="eventClick"
      :event-color="getEventColor"
    ></v-calendar>

    <v-divider class="mt-5"></v-divider>

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
    <ContractDetails
      v-else-if="selectedContract"
      :contract="selectedContract"
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
import {
  contractsStore,
  contractStore,
  groupsStore
} from "~/utils/store-accessor";

import ContractSkillListItemTeacherDashboard from "~/components/ContractSkillListItemTeacherDashboard.vue";
import CreateContractDialog from "~/components/CreateContractDialog.vue";

import ContractSkillAddDialog from "~/components/contract/skill/AddDialog.vue";
import { FetchContractsQuery } from "~/types/types";
import ContractDetails from "~/components/contract/ContractDetails.vue";

@Component({
  layout: "teacher",
  async asyncData() {
    // const { data }: { data: ContractsDatesOnlyQuery } = await $apollo.query({
    //   query: ContractsDatesOnlyQueryGQL
    // });
    // return { contractsOnlyDates: data.contracts };
    await Promise.all([
      contractsStore.fetchContracts(),
      groupsStore.fetchGroups()
    ]);
  },
  components: {
    ContractDetails,
    ContractSkillListItemTeacherDashboard,
    CreateContractDialog,
    ContractSkillAddDialog
  }
})
export default class TeacherContractsPage extends Vue {
  @Ref("calendar") readonly calendarRef!: any;

  calendarValue = new Date().toISOString();
  loading = false;

  prev() {
    //@ts-ignore
    this.calendarRef.prev();
  }

  next() {
    //@ts-ignore
    this.calendarRef.next();
  }

  async eventClick({ event }: { event: FetchContractsQuery["contracts"][0] }) {
    try {
      this.loading = true;
      await contractStore.fetchContract(event.id);
    } catch (e) {
      console.log({ e });
    } finally {
      this.loading = false;
    }
  }

  get selectedContract() {
    return contractStore.contract;
  }

  get contractsFormattedForCalendar() {
    return contractsStore.contractsFormattedForCalendar;
  }

  getEventColor(event: FetchContractsQuery["contracts"][0]) {
    return event.rgb;
  }

  //TODO
  async generateSheetFile() {
    // const { data }: { data: GetSheetFileQuery } = await this.$apollo.query({
    //   query: GetSheetFileQueryGQL
    // });
    //
    // window.open(data.contractsToExcel, "_blank");
  }
}
</script>
