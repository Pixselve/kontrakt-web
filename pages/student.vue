<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>{{ student.firstName }} {{ student.lastName }}</h1>
        <v-chip-group>
          <v-chip
            color="primary"
            small
            label
            v-for="group in student.groups"
            :key="group.id"
            >{{ group.name }}
          </v-chip>
        </v-chip-group>
      </v-col>
      <v-col class="text-right">
        <v-btn icon @click="toggleTheme">
          <v-icon
            v-text="
              isDarkTheme
                ? 'mdi-moon-waxing-crescent'
                : 'mdi-white-balance-sunny'
            "
          >
          </v-icon>
        </v-btn>
        <v-btn @click="disconnect" icon>
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <v-row class="fill-height">
      <v-col>
        <h1>Les contrats</h1>
        <v-sheet height="64">
          <v-toolbar flat color="white">
            <v-btn fab text small color="grey darken-2" @click="prev">
              <v-icon small>mdi-chevron-left</v-icon>
            </v-btn>
            <v-btn fab text small color="grey darken-2" @click="next">
              <v-icon small>mdi-chevron-right</v-icon>
            </v-btn>
            <h3>
              {{
                new Date(calendarValue).toLocaleDateString("fr-FR", {
                  month: "long",
                  year: "numeric"
                })
              }}
            </h3>
            <v-spacer></v-spacer>
          </v-toolbar>
        </v-sheet>
        <v-sheet height="600">
          <v-calendar
            :weekdays="[1, 2, 3, 4, 5]"
            locale="fr-FR"
            ref="calendar"
            v-model="calendarValue"
            color="primary"
            :events="contractsFormattedForCalendar"
            @click:event="showEvent"
            :event-color="getEventColor"
          ></v-calendar>
          <v-menu
            v-if="selectedContract"
            v-model="selectedOpen"
            :close-on-content-click="false"
            :activator="selectedElement"
            offset-x
            max-width="500px"
          >
            <v-card color="grey lighten-4" min-width="350px" flat>
              <v-toolbar :color="selectedContract.color" dark>
                <v-btn icon @click="selectedOpen = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>{{ selectedContract.name }}</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <skills-table
                  :student-skills="skillToStudent"
                  :skills="selectedContract.skills"
                ></skills-table>
              </v-card-text>
            </v-card>
          </v-menu>
        </v-sheet>
      </v-col>
    </v-row>

    <v-row v-if="skillsCountNeededToBeFinished > 0">
      <v-col cols="12">
        <h1>
          Les compétences à terminer
          <v-badge :content="skillsCountNeededToBeFinished"></v-badge>
        </h1>
      </v-col>
      <v-col
        v-for="contract in contractsNeededToBeFinished"
        :key="contract.id"
        cols="12"
        xs="12"
        sm="12"
        md="6"
        lg="4"
        xl="4"
      >
        <awaiting-finish-contract-card
          :contract="contract"
        ></awaiting-finish-contract-card>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12">
        <h1>Vous n'avez plus rien à faire 😁</h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Ref, Vue } from "vue-property-decorator";
import ContactPopup from "~/components/ContractPopup.vue";
import SkillsTable from "~/components/SkillsTable.vue";
import ContractCard from "~/components/ContractCard.vue";
import ContractCardWithPopup from "~/components/ContractCardWithPopup.vue";
import AwaitingFinishContractCard from "~/components/AwaitingFinishContractCard.vue";
import { FetchContractsQuery } from "~/types/types";

@Component({
  components: {
    SkillsTable,
    ContactPopup,
    ContractCard,
    ContractCardWithPopup,
    AwaitingFinishContractCard
  },
  head: () => ({
    title: "Élève"
  }),
  async asyncData() {
    await studentStore.fetchMe();
    if (studentStore.student?.id) {
      await contractsStore.fetchContractsOfGroups(
        studentStore.student.groups.map(group => group.id) ?? []
      );
      await studentStore.fetchAwaitingToFinishContracts(
        studentStore.student?.id
      );
    } else {
      throw "Student fetch not completed";
    }
  },
  middleware: "studentLogged"
})
export default class StudentPage extends Vue {
  @Ref("calendar") readonly calendarRef!: HTMLElement;

  calendarValue = new Date().toISOString();
  selectedOpen = false;
  selectedContract: FetchContractsQuery["contracts"][0] | null = null;
  selectedElement: null | EventTarget = null;

  showEvent({
    nativeEvent,
    event
  }: {
    nativeEvent: Event;
    event: FetchContractsQuery["contracts"][0];
  }) {
    const open = () => {
      this.selectedContract = event;
      this.selectedElement = nativeEvent.target;
      setTimeout(() => (this.selectedOpen = true), 10);
    };

    if (this.selectedOpen) {
      this.selectedOpen = false;
      setTimeout(open, 10);
    } else {
      open();
    }

    nativeEvent.stopPropagation();
  }

  prev() {
    //@ts-ignore
    this.calendarRef.prev();
  }

  getEventColor(event: FetchContractsQuery["contracts"][0]) {
    return event.hexColor;
  }

  next() {
    //@ts-ignore
    this.calendarRef.next();
  }

  get isDarkTheme() {
    return this.$vuetify.theme.dark;
  }

  toggleTheme() {
    this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
  }

  async disconnect() {
    await this.$apolloHelpers.onLogout();
    this.$cookies.remove("type");
    await this.$router.push("/login");
  }

  get contractsNeededToBeFinished() {
    return studentStore.contractsNeededToBeFinished;
  }

  get skillsCountNeededToBeFinished() {
    return studentStore.skillsCountNeededToBeFinished;
  }

  get contracts() {
    return contractsStore.contracts;
  }

  get student() {
    return studentStore.student;
  }

  get skillToStudent() {
    return studentStore.student?.skillsToStudent;
  }

  get contractsFormattedForCalendar() {
    return contractsStore.contractsFormattedForCalendar;
  }
}
</script>
