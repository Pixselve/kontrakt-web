<template>
  <div>
    <v-app-bar
    >
      <v-app-bar-nav-icon to="/teacher/contracts">
        <v-icon>mdi-arrow-left</v-icon>
      </v-app-bar-nav-icon>

      <v-toolbar-title>{{ contract.name }} ({{ getFormattedDate(contract.start) }} -
        {{ getFormattedDate(contract.end) }})
      </v-toolbar-title>

    </v-app-bar>
    <v-container fluid>
      <v-simple-table>
        <template v-slot:default>
          <thead>
          <tr>
            <td class="text-left">Élève</td>
            <th v-for="skill in contract.skills" :key="skill.id" class="text-left">{{ skill.name }}</th>
          </tr>
          </thead>
          <tbody>
          <student-skill-table-row v-for="(student, i) in students"
                                   :key="student.ownerUsername"
                                   :contract-i-d="contract.id"
                                   :skills="contract.skills"
                                   :student="student"></student-skill-table-row>
          </tbody>
        </template>
      </v-simple-table>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import StudentSkillTableRow from "~/components/StudentSkillTableRow.vue";
import { FetchContractQuery, FetchStudentForContractQuery, Group } from "~/types/types";
import FetchContractGQL from "~/apollo/queries/FetchContract.graphql";
import FetchStudentForContractGQL from "~/apollo/queries/FetchStudentForContract.graphql";

@Component<TeacherContractPage>({
  layout: "teacher",
  head: () => ({
    title: "Mon contrat",
  }),
  components: {
    StudentSkillTableRow,
  },
  apollo: {
    contract: {
      query: FetchContractGQL,
      variables() {
        return { id: parseInt(this.$route.params.id) };
      },
      error(error) {
        console.log({ errorContract: error.networkError });
      }
    },
    students: {
      query: FetchStudentForContractGQL,
      variables() {
        return { contractID: parseInt(this.$route.params.id) };
      },
      error(error) {
        console.log({ errorStudents: error.networkError });
      }
    },
  },
})
export default class TeacherContractPage extends Vue {
  contract!: FetchContractQuery["contract"];
  students: FetchStudentForContractQuery["students"] = [];

  getFormattedDate(date: string) {
    return new Date(date).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
  }

  mapGroupsId(
    groups: { __typename?: "Group" | undefined } & Pick<Group, "id" | "name">[]
  ) {
    return groups.map((group) => group.id);
  }

}
</script>
