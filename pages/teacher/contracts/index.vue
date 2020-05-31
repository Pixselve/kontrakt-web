<template>
  <v-container>
    <v-row align="center" justify="space-between">
      <v-col>
        <h1 class="secondary--text mr-5">
          Mes contracts
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
    <v-row v-else-if="!loading && selectedContract">
      <v-col cols="12">
        <v-row align="center" no-gutters>
          <h2>{{ selectedContract.name }}</h2>
          <h5>
            ({{ getFormattedDate(selectedContract.date) }} -
            {{ getFormattedDate(selectedContract.end) }})
          </h5>

          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list>
              <contract-skill-add-dialog>
                <template v-slot:default="{ on }">
                  <v-list-item v-on="on">
                    <v-list-item-avatar>
                      <v-icon>mdi-playlist-plus</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-title
                      >Ajouter une compétence</v-list-item-title
                    >
                  </v-list-item>
                </template>
              </contract-skill-add-dialog>

              <v-list-item :to="`/teacher/contracts/${selectedContract.id}`">
                <v-list-item-avatar>
                  <v-icon>mdi-playlist-edit</v-icon>
                </v-list-item-avatar>
                <v-list-item-title>Compléter les compétences</v-list-item-title>
              </v-list-item>
              <v-list-item @click="deleteContract">
                <v-list-item-avatar>
                  <v-icon>mdi-delete</v-icon>
                </v-list-item-avatar>
                <v-list-item-title>Supprimer le contrat</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-row>
      </v-col>
      <!--      <v-col v-for="i in 3">-->
      <!--        <v-card>-->
      <!--          <v-card-title>Élèves ayant terminé le contrat</v-card-title>-->
      <!--          <v-card-text class="text-center">-->
      <!--            <v-progress-circular size="100" width="10" value="95" color="red"-->
      <!--              ><h2>25%</h2></v-progress-circular-->
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
    </v-row>
    <v-row v-else>
      <v-col cols="12">
        <v-alert type="info">Veuillez selectionner un contrat</v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Ref, Vue } from "vue-property-decorator";
import { contractsStore, contractStore } from "~/utils/store-accessor";

import ContractSkillListItemTeacherDashboard from "~/components/ContractSkillListItemTeacherDashboard.vue";
import CreateContractDialog from "~/components/CreateContractDialog.vue";

import ContractSkillAddDialog from "~/components/contract/skill/AddDialog.vue";
import { FetchContractQueryWithColor } from "~/store/contracts";

@Component({
  layout: "teacher",
  async asyncData() {
    // const { data }: { data: ContractsDatesOnlyQuery } = await $apollo.query({
    //   query: ContractsDatesOnlyQueryGQL
    // });
    // return { contractsOnlyDates: data.contracts };
    await contractsStore.fetchContracts();
  },
  components: {
    ContractSkillListItemTeacherDashboard,
    CreateContractDialog,
    ContractSkillAddDialog
  }
})
export default class TeacherContractsPageBeta extends Vue {
  @Ref("calendar") readonly calendarRef!: any;

  calendarValue = new Date().toISOString();
  loading = false;
  loadingDeletion = false;

  getFormattedDate(date: string) {
    return new Date(date).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "numeric",
      year: "numeric"
    });
  }

  prev() {
    //@ts-ignore
    this.calendarRef.prev();
  }

  next() {
    //@ts-ignore
    this.calendarRef.next();
  }


  async eventClick({
    event
  }: {
    event: { start: string; name: string; end: string; id: number };
  }) {
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

  get contracts() {
    return contractsStore.getContracts;
  }

  get contractsFormattedForCalendar() {
    return contractsStore.contractsFormattedForCalendar;
  }
  getEventColor(event: FetchContractQueryWithColor) {
    return event.color;
  }

  async deleteContract() {
    try {
      if (!this.selectedContract) throw new Error("");
      this.loadingDeletion = true;
      await contractStore.deleteContract();
      await contractsStore.fetchContracts();
    } catch (e) {
      alert("Une erreur est survenue lors de la suppression du contrat");
      console.log({ e });
    } finally {
      this.loadingDeletion = false;
    }
  }

  async generateSheetFile() {
    // const { data }: { data: GetSheetFileQuery } = await this.$apollo.query({
    //   query: GetSheetFileQueryGQL
    // });
    //
    // window.open(data.contractsToExcel, "_blank");
  }
}
</script>
