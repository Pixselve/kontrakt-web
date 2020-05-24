<template>
  <div>
    <v-app-bar
    >
      <v-app-bar-nav-icon to="/teacher/contracts">
        <v-icon>mdi-arrow-left</v-icon>
      </v-app-bar-nav-icon>

      <v-toolbar-title>{{contract.name}} ({{ getFormattedDate(contract.date) }} -
        {{ getFormattedDate(contract.end) }})</v-toolbar-title>

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
          <student-skill-table-row :skills="contract.skills" v-for="student in students" :student="student"
                                   :key="student.id"></student-skill-table-row>
          </tbody>
        </template>
      </v-simple-table>
    </v-container>
  </div>

</template>

<script lang="ts">
  import { Vue, Component }               from 'vue-property-decorator';
  import { contractStore, studentsStore } from "~/utils/store-accessor";
  import StudentSkillTableRow             from "~/components/StudentSkillTableRow.vue";

  @Component({
    layout: "teacher",
    head: () => ({
      title: "Mon contrat"
    }),
    components: {
      StudentSkillTableRow
    },
    async asyncData() {
      await studentsStore.fetchStudents();
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

    get students() {
      return studentsStore.students;
    };

  }
</script>
