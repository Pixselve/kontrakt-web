<template>
  <v-container>
    <v-row align="center" justify="space-between">
      <v-col>
        <h1 class="secondary--text mr-5">Mes élèves</h1>
      </v-col>
      <v-col class="text-right">
        <import-student-with-c-s-v-dialog>
          <template v-slot:default="{ on }">
            <v-btn v-on="on" color="secondary">
              <v-icon left>mdi-file-upload</v-icon>
              Importer un CSV
            </v-btn>
          </template>
        </import-student-with-c-s-v-dialog>
        <create-student-dialog>
          <template v-slot:default="{ on }">
            <v-btn v-on="on" color="secondary">
              <v-icon left>mdi-account-plus</v-icon>
              Ajouter un élève
            </v-btn>
          </template>
        </create-student-dialog>
      </v-col>
    </v-row>
    <v-divider class="mb-5"></v-divider>
    <v-alert v-if="students.length <= 0" type="info"
      >Vous n'avez pas encore ajouté d'élève</v-alert
    >


        <student-list-item
          :highest-awaiting-to-finish-skill-count="
            highestAwaitingToFinishSkillCount
          "
          v-for="student in students"
          :key="student.id"
          :student="student"
        ></student-list-item>

  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { groupsStore, studentsStore } from "~/utils/store-accessor";
import StudentListItem from "~/components/StudentListItem.vue";
import CreateStudentDialog from "~/components/CreateStudentDialog.vue";
import ImportStudentWithCSVDialog from "~/components/student/ImportStudentWithCSVDialog.vue";

@Component({
  layout: "teacher",
  async asyncData() {
    await studentsStore.fetchStudents();

    await groupsStore.fetchGroups();
  },
  components: {
    StudentListItem,
    CreateStudentDialog,
    ImportStudentWithCSVDialog
  }
})
export default class TeacherStudentsPageBeta extends Vue {
  get students() {
    return studentsStore.students;
  }

  get highestAwaitingToFinishSkillCount() {
    let result = 0;
    this.students?.forEach(
      student =>
        (result = Math.max(
          result,
          student.skillsToStudentToFinish?.length ?? 0
        ))
    );
    return result;
  }
}
</script>
