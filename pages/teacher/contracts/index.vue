<template>
  <v-container>
    <v-row align="center" justify="space-between">
      <v-col>
        <h1 class="secondary--text mr-5">Mes contracts</h1>
      </v-col>
      <v-col class="text-right">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              disabled
              v-on="on"
              color="secondary"
            >
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
              year: "numeric",
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
      :events="contracts"
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
      <v-col cols="12"> Chargement du contrat... </v-col>
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
import ContractsDatesOnlyQueryGQL from "~/apollo/queries/ContractsDatesOnly.graphql";

import ContractSkillListItemTeacherDashboard from "~/components/ContractSkillListItemTeacherDashboard.vue";
import CreateContractDialog from "~/components/CreateContractDialog.vue";

import ContractSkillAddDialog from "~/components/contract/skill/AddDialog.vue";
import { ContractsDatesOnlyQuery, FetchContractQuery, FetchContractsQuery } from "~/types/types";
import ContractDetails from "~/components/contract/ContractDetails.vue";
import  FetchContractGQL  from "~/apollo/queries/FetchContract.graphql";

@Component({
  layout: "teacher",
  async asyncData({ app }) {
    let client = app.apolloProvider.defaultClient;
    const { data }: { data: ContractsDatesOnlyQuery } = await client.query({
      query: ContractsDatesOnlyQueryGQL,
    });
    const contractsWithFormattedDates = data.contracts.map((contract) => ({
      start: new Date(contract.start).getTime(),
      end: new Date(contract.end).getTime(),
      hexColor: contract.hexColor,
      name: contract.name,
      id: contract.id
    }));
    return { contracts: contractsWithFormattedDates };
  },
  components: {
    ContractDetails,
    ContractSkillListItemTeacherDashboard,
    CreateContractDialog,
    ContractSkillAddDialog,
  },
})
export default class TeacherContractsPage extends Vue {
  @Ref("calendar") readonly calendarRef!: any;
  contracts: ContractsDatesOnlyQuery.contracts = [];
  calendarValue = new Date().toISOString();
  loading = false;
  selectedContract = null;

  prev() {
    this.calendarRef.prev();
  }

  next() {
    this.calendarRef.next();
  }

  async eventClick({ event }: { event: FetchContractsQuery["contracts"][0] }) {
    try {
      this.loading = true;
      const {data}: {data: FetchContractQuery} = await this.$apollo.query({
        query: FetchContractGQL,
        variables: {
          id: event.id
        }
      })
      this.selectedContract = data.contract
    } catch (e) {
      console.log({ e });
    } finally {
      this.loading = false;
    }
  }

  getEventColor(event: FetchContractsQuery["contracts"][0]) {
    return event.hexColor;
  }
}
</script>
