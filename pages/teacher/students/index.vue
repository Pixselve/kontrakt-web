<template>
  <v-container>
    <v-row align="center" justify="space-between">
      <v-col>
        <h1 class="secondary--text mr-5">Mes élèves
        </h1>
      </v-col>
      <v-col class="text-right">
        <create-student-dialog>
          <template v-slot:default="{on}">
            <v-btn v-on="on" color="secondary">
              <v-icon left>mdi-account-plus</v-icon>
              Ajouter un élève
            </v-btn>
          </template>
        </create-student-dialog>


      </v-col>
    </v-row>
    <v-divider></v-divider>

    <student-list-item :highest-awaiting-to-finish-skill-count="highestAwaitingToFinishSkillCount"
                       v-for="student in students" :key="student.id" :student="student"></student-list-item>
  </v-container>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { studentsStore } from "~/utils/store-accessor";
  import FetchStudentsWithAwaitingToFinishContractsQueryGQL
    from "@/apollo/queries/FetchStudentsWithAwaitingToFinishContracts.graphql";
  import { FetchStudentsWithAwaitingToFinishContractsQuery } from "~/types/types";
  import StudentListItem from "~/components/StudentListItem.vue";
  import CreateStudentDialog from "~/components/CreateStudentDialog.vue";

  @Component({
    layout: "teacher",
    async asyncData() {
      await studentsStore.fetchStudents();
    },
    components: {
      StudentListItem,
      CreateStudentDialog
    },
    apollo: {
      students: {
        query: FetchStudentsWithAwaitingToFinishContractsQueryGQL
      }
    }
  })
  export default class TeacherStudentsPageBeta extends Vue {
    students: FetchStudentsWithAwaitingToFinishContractsQuery["students"] | null = null;
    // get students() {
    //   return studentsStore.students;
    // }
    get highestAwaitingToFinishSkillCount() {
      let result = 0;
      this.students?.forEach(student => result = Math.max(result, student.skillToStudents?.length ?? 0));
      return result;
    }

  }
</script>
