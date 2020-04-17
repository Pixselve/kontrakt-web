<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Mes élèves</h1>
        <create-student-dialog></create-student-dialog>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-simple-table>
          <template v-slot:default>
            <thead>
            <tr>
              <th class="text-left">Nom</th>
              <th class="text-left">Prénom</th>
            </tr>
            </thead>
            <tbody>


            <tr @click="$router.push(`/teacher/students/${student.id}`)" v-for="student in students" :key="student.id">
              <td>{{student.lastName}}</td>
              <td>{{student.firstName}}</td>
            </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
  import { Vue, Component }  from 'vue-property-decorator';
  import { studentsStore }   from "~/utils/store-accessor";
  import CreateStudentDialog from "~/components/CreateStudentDialog.vue";

  @Component({
    layout: "teacher",
    head: () => ({
      title: "Les élèves"
    }),
    async asyncData() {
      await studentsStore.fetchStudents();
    },
    components: {
      CreateStudentDialog
    }
  })
  export default class TeacherStudentsPage extends Vue {

    get students() {
      return studentsStore.allStudents;
    }

  }
</script>
