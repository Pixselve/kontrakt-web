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
      v-for="student in students"
      :key="student.ownerUsername"
      :student="student"
    ></student-list-item>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import StudentListItem from "~/components/StudentListItem.vue";
import CreateStudentDialog from "~/components/CreateStudentDialog.vue";
import ImportStudentWithCSVDialog from "~/components/student/ImportStudentWithCSVDialog.vue";
import FetchStudentsQueryGQL from "~/apollo/queries/FetchStudents.graphql";
import { FetchStudentsQuery } from "~/types/types";

@Component<TeacherStudentsPageBeta>({
  layout: "teacher",
  async asyncData({ app }) {
    let client = app.apolloProvider.defaultClient;
    const { data }: { data: FetchStudentsQuery } = await client.query({
      query: FetchStudentsQueryGQL,
      fetchPolicy: "no-cache",
    });
    return {
      students: data.students,
    };
  },
  head: () => ({
    title: "Mes élèves"
  }),
  components: {
    StudentListItem,
    CreateStudentDialog,
    ImportStudentWithCSVDialog,
  }
})
export default class TeacherStudentsPageBeta extends Vue {
  students: any[] = [];
}
</script>
