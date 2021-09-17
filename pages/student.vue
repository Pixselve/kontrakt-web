<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Bonjour {{ me.firstName }} ! 👋</h1>
        <v-chip-group>
          <v-chip
            v-for="group in me.groups"
            :key="group.id"
            color="primary"
            label
            small
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
        <v-btn icon @click="disconnect">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <v-row class="fill-height">
      <v-col>
        <h1>Les contrats</h1>
        <v-sheet height="64">
          <v-toolbar color="white" flat>
            <v-btn color="grey darken-2" fab small text @click="prev">
              <v-icon small>mdi-chevron-left</v-icon>
            </v-btn>
            <v-btn color="grey darken-2" fab small text @click="next">
              <v-icon small>mdi-chevron-right</v-icon>
            </v-btn>
            <h3>
              {{
                new Date(calendarValue).toLocaleDateString("fr-FR", {
                  month: "long",
                  year: "numeric",
                })
              }}
            </h3>
            <v-spacer></v-spacer>
          </v-toolbar>
        </v-sheet>
        <v-sheet height="600">
          <v-calendar
            ref="calendar"
            v-model="calendarValue"
            :event-color="getEventColor"
            :events="contracts"
            :weekdays="[1, 2, 3, 4, 5]"
            color="primary"
            locale="fr-FR"
            @click:event="showEvent"
          ></v-calendar>
          <v-menu
            v-if="selectedContract"
            v-model="selectedOpen"
            :activator="selectedElement"
            :close-on-content-click="false"
            max-width="500px"
            offset-x
          >
            <v-card color="grey lighten-4" flat min-width="350px">
              <v-toolbar :color="selectedContract.color" dark>
                <v-btn icon @click="selectedOpen = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>{{ selectedContract.name }}</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <skills-table
                  :student-skills="selectedContractStudentSkills"
                ></skills-table>
              </v-card-text>
            </v-card>
          </v-menu>
        </v-sheet>
      </v-col>
    </v-row>

    <v-row v-if="studentSkillsToFinish.length > 0">
      <v-col cols="12">
        <h1>
          Les compétences à terminer
          <v-badge :content="studentSkillsToFinish.length"></v-badge>
        </h1>
      </v-col>
      <v-col
        v-for="contract in contractsToFinish"
        :key="contract.id"
        cols="12"
        lg="4"
        md="6"
        sm="12"
        xl="4"
        xs="12"
      >
        <awaiting-finish-contract-card
          :contract="contract"
          :skill-i-d-to-mark="skillIDToMark"
        ></awaiting-finish-contract-card>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12">
        <h1>Vous n'avez plus rien à faire 😁</h1>
        <img
          alt="Fille qui danse"
          src="https://c.tenor.com/A-ozELwp694AAAAC/thumbs-thumbs-up-kid.gif"
        />
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
import { FetchContractsQuery, FindManyContractsOfGroupsQuery, Mark, MeQuery, StudentSkill, } from "~/types/types";
import MeQueryGQL from "~/apollo/queries/Me.graphql";
import FindManyContractsOfGroupsQueryGQL from "~/apollo/queries/contact/FindManyContractsOfGroups.graphql";

@Component<StudentPage>({
  components: {
    SkillsTable,
    ContactPopup,
    ContractCard,
    ContractCardWithPopup,
    AwaitingFinishContractCard,
  },
  head: () => ({
    title: "Élève",
  }),
  async fetch() {
    const { data: studentData }: { data: MeQuery } = await this.$apollo.query({
      query: MeQueryGQL,
    });

    const { data: contractsData }: { data: FindManyContractsOfGroupsQuery } =
      await this.$apollo.query({
        query: FindManyContractsOfGroupsQueryGQL,
        variables: {
          groups: studentData.me.student[0].groups.map((group) => group.id),
        },
      });

    this.me = studentData.me.student[0];
    this.contracts = contractsData.contracts.map(({ start, end, ...rest }) => ({
      ...rest,
      start: start.split(" ")[0],
      end: end.split(" ")[0],
    }));
    studentData.me.student[0].studentSkills.forEach((studentSkill) =>
      this.skillIDToMark.set(studentSkill.skillID, studentSkill.mark)
    );
  },
  middleware: "studentLogged",
})
export default class StudentPage extends Vue {
  @Ref("calendar") readonly calendarRef!: HTMLElement;
  me: MeQuery["me"]["student"][0] | null = null;
  contracts: FindManyContractsOfGroupsQuery["contracts"] = [];
  skillIDToMark: Map<number, Mark> = new Map<number, Mark>();

  calendarValue = new Date().toISOString();
  selectedOpen = false;
  selectedContract: FetchContractsQuery["contracts"][0] | null = null;
  selectedElement: null | EventTarget = null;

  get selectedContractStudentSkills() {
    return (
      this.me?.studentSkills.filter((studentSkill) =>
        this.selectedContract?.skills.some(
          (skill) => skill.id === studentSkill.skillID
        )
      ) ?? []
    );
  }

  get isDarkTheme() {
    return this.$vuetify.theme.dark;
  }

  get studentSkillsToFinish(): ({
    __typename?: "StudentSkill" | undefined;
  } & Pick<StudentSkill, "skillID" | "mark">)[] {
    return (
      this.me?.studentSkills.filter((studentSkill) =>
        ["TODO"].includes(studentSkill.mark)
      ) ?? []
    );
  }

  get skillsIDToFinish() {
    return this.studentSkillsToFinish.map(
      (studentSkill) => studentSkill.skillID
    );
  }

  get contractsToFinish() {
    return this.contracts.filter((contract) =>
      contract.skills.some((skill) => this.skillsIDToFinish.includes(skill.id))
    );
  }

  showEvent({
              nativeEvent,
              event,
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

  toggleTheme() {
    this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
  }

  async disconnect() {
    await this.$apolloHelpers.onLogout();
    this.$cookies.remove("type");
    await this.$router.push("/login");
  }
}
</script>
