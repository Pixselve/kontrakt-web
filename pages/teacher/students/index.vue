<template>
  <v-container>
    <v-row align="center" justify="space-between">
      <v-col>
        <h1 class="secondary--text mr-5">Mes élèves</h1>
      </v-col>
      <v-col class="text-right">
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
    <v-skeleton-loader
      v-if="this.$apollo.queries.students.loading"
      type="table"
    ></v-skeleton-loader>
    <div v-else>
      <v-alert v-if="students.length <= 0" type="info"
        >Vous n'avez pas encore ajouté d'élève
      </v-alert>
      <student-list-item
        v-for="student in students"
        :key="student.ownerUsername"
        :student="student"
      ></student-list-item>
    </div>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import StudentListItem from "~/components/StudentListItem.vue";
import CreateStudentDialog from "~/components/CreateStudentDialog.vue";
import FetchStudentsQueryGQL from "~/apollo/queries/FetchStudents.graphql";
import { FetchStudentsQuery } from "~/types/types";

@Component<TeacherStudentsPageBeta>({
  layout: "teacher",
  apollo: {
    students: {
      query: FetchStudentsQueryGQL,
    },
  },
  head: () => ({
    title: "Mes élèves",
  }),
  components: {
    StudentListItem,
    CreateStudentDialog,
  },
})
export default class TeacherStudentsPageBeta extends Vue {
  students: FetchStudentsQuery["students"] = [];
}
</script>
