<template>
  <v-card color="transparent" :disabled="loading" class="mx-auto" flat max-width="500px">
    <v-card-text class="text-center">
      <v-img width="50%" class="mx-auto mb-5" src="/logo_text_colored.svg"></v-img>
      <h1 class="mb-10">Connexion élève</h1>
      <v-form ref="form" @submit.prevent="login">
        <v-autocomplete required clearable :rules="rules.input" v-model="selectedStudent"
                        :items="students" outlined
                        prepend-inner-icon="mdi-account"
                        label="Élève">
        </v-autocomplete>
        <v-row no-gutters>
          <v-btn to="/teacher/login" color="primary" text>Je suis un enseignant</v-btn>
          <v-spacer></v-spacer>
          <v-btn :loading="loading" type="submit" color="primary">Connexion</v-btn>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
  import { Vue, Component, Ref }                                                  from 'vue-property-decorator';
  import LoginTeacherMutationGQL
                                                                                  from "~/apollo/mutations/LoginTeacher.graphql";
  import CheckIfStudentExistsMutationGQL
                                                                                  from "~/apollo/mutations/CheckIfStudentExists.graphql";
  import { CheckIfStudentExistsMutationVariables, LoginTeacherMutationVariables } from "~/types/types";
  import { studentsStore, studentStore }                                          from "~/utils/store-accessor";
  import { $apollo }                                                              from "~/utils/getGraphQLClient";


  @Component({
    head: () => ({
      title: "Connexion élève"
    }),
    async fetch() {
      await studentsStore.fetchStudents();
    }
  })
  export default class LoginPage extends Vue {

    @Ref("form") formRef!: HTMLFormElement;

    loading = false;


    get students() {
      return studentsStore.studentsComboboxFormatted;
    }

    selectedStudent: number | null = null;

    rules = {
      input: [
        (v: string | null) => v ?? "Veuillez sélectionner un élève"
      ]
    };

    async login() {
      try {
        if (this.formRef.validate() && this.selectedStudent) {
          this.loading = true;
          await studentStore.fetchStudent(this.selectedStudent);
          await this.$router.push("/student");
        }
      } catch ( e ) {
        //TODO - Error messages
        alert("Une erreur est survenue");
      } finally {
        this.loading = false;
      }
    }

  }
</script>
