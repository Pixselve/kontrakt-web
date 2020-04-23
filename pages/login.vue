<template>

  <v-card :disabled="loading" class="mx-auto" flat max-width="500px">

    <v-card-text class="text-center">

      <v-avatar class="mb-5" color="blue">
        <v-icon dark>mdi-school</v-icon>
      </v-avatar>
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


  <!--  <v-container fill-height>-->
  <!--    <v-row justify="center" align-content="center">-->
  <!--      <v-card :disabled="loading" :loading="loading" max-width="500px">-->
  <!--        <v-container>-->
  <!--          <v-card-title>Choisissez votre mode de connexion</v-card-title>-->
  <!--          <v-tabs-items v-model="tab">-->
  <!--            <v-tab-item>-->
  <!--              <v-card-text>-->
  <!--                <v-form ref="studentForm" @submit.prevent="submitStudent">-->
  <!--                  <v-autocomplete required clearable :rules="rules.student.input" v-model="studentForm"-->
  <!--                                  :items="students" outlined-->
  <!--                                  prepend-inner-icon="mdi-account"-->
  <!--                                  placeholder="Élève"></v-autocomplete>-->
  <!--                  <v-btn type="submit" block color="primary">Connexion</v-btn>-->
  <!--                </v-form>-->
  <!--              </v-card-text>-->
  <!--            </v-tab-item>-->
  <!--            <v-tab-item>-->
  <!--              <v-card-text>-->
  <!--                <v-form ref="teacherForm" @submit.prevent="submitTeacher">-->
  <!--                  <v-text-field required :rules="rules.teacher.email" v-model="teacherForm.email"-->
  <!--                                prepend-inner-icon="mdi-account" outlined-->
  <!--                                placeholder="Adresse email"></v-text-field>-->
  <!--                  <v-text-field required :rules="rules.teacher.password" v-model="teacherForm.password"-->
  <!--                                prepend-inner-icon="mdi-lock" type="password" clearable-->
  <!--                                outlined-->
  <!--                                placeholder="Mot de passe"></v-text-field>-->
  <!--                  <v-btn type="submit" block color="primary">Connexion</v-btn>-->
  <!--                </v-form>-->
  <!--              </v-card-text>-->
  <!--            </v-tab-item>-->
  <!--          </v-tabs-items>-->
  <!--        </v-container>-->
  <!--        <v-tabs v-model="tab" grow icons-and-text>-->
  <!--          <v-tab>Élève-->
  <!--            <v-icon>mdi-account</v-icon>-->
  <!--          </v-tab>-->
  <!--          <v-tab>Enseignant-->
  <!--            <v-icon>mdi-teach</v-icon>-->
  <!--          </v-tab>-->
  <!--        </v-tabs>-->
  <!--      </v-card>-->
  <!--    </v-row>-->
  <!--  </v-container>-->
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
        (v: string | null) => !!v || "Veuillez sélectionner un élève"
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
