<template>
  <div>
    <v-app-bar
    >
      <v-app-bar-nav-icon to="/teacher/contracts">
        <v-icon>mdi-arrow-left</v-icon>
      </v-app-bar-nav-icon>

      <v-toolbar-title>{{contract.name}} ({{ getFormattedDate(contract.start) }} -
        {{ getFormattedDate(contract.end) }})
      </v-toolbar-title>

    </v-app-bar>
    <v-container fluid>
      <v-simple-table>
        <template v-slot:default>
          <thead>
          <tr>
            <td class="text-left">Élève</td>
            <th v-for="skill in contract.skills" :key="skill.id" class="text-left">{{skill.name}}</th>
          </tr>
          </thead>
          <tbody>
          <student-skill-table-row :skills="contract.skills" v-for="student in studentsConcernedByTheContract"
                                   :student="student"
                                   :key="student.id"></student-skill-table-row>
          </tbody>
        </template>
      </v-simple-table>
    </v-container>
  </div>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { contractStore, marksStore, studentsStore } from "~/utils/store-accessor";
import StudentSkillTableRow from "~/components/StudentSkillTableRow.vue";
import { Group } from "~/types/types";
import { shareCommonElements } from "~/utils/shareCommonElements"

@Component({
  layout: "teacher",
  head: () => ({
    title: "Mon contrat"
  }),
  components: {
    StudentSkillTableRow
  },
  async asyncData() {
    await Promise.all([studentsStore.fetchStudents(), marksStore.fetchMarks()]);
  },
  //@ts-ignore
  async validate({ params }) {
    if (!/[1-9]+/g.test(params.id)) return false;
    await contractStore.fetchContract(parseInt(params.id));
    return contractStore.contract !== null;
  }
})
export default class TeacherContractPage extends Vue {
  getFormattedDate(date: string) {
    return new Date(date).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "numeric",
      year: "numeric"
    });
  }





  get contract() {
    return contractStore.contract;
  };

  mapGroupsId(groups: { __typename?: "Group" | undefined; } & Pick<Group, "id" | "name">[]) {
    return groups.map(group => (group.id));
  }


  get studentsConcernedByTheContract() {
    if ((this.contract?.groups ?? []).length > 0) {
      return studentsStore.students.filter(student => shareCommonElements(this.mapGroupsId(student.groups ?? []), this.mapGroupsId(this.contract?.groups ?? [])));

    } else {
      return studentsStore.students;
    }
  };
}
</script>
