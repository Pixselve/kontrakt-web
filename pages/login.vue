<template>
  <v-container fill-height>
    <v-row justify="center" align-content="center">
      <v-card :disabled="loading" :loading="loading" max-width="500px">
        <v-container>
          <v-card-title>Choisissez votre mode de connexion</v-card-title>
          <v-tabs-items v-model="tab">
            <v-tab-item>
              <v-card-text>
                <v-form ref="studentForm" @submit.prevent="submitStudent">
                  <v-autocomplete required clearable :rules="rules.student.input" v-model="studentForm"
                                  :items="students" outlined
                                  prepend-inner-icon="mdi-account"
                                  placeholder="Élève"></v-autocomplete>
                  <v-btn type="submit" block color="primary">Connexion</v-btn>
                </v-form>
              </v-card-text>
            </v-tab-item>
            <v-tab-item>
              <v-card-text>
                <v-form ref="teacherForm" @submit.prevent="submitTeacher">
                  <v-text-field required :rules="rules.teacher.email" v-model="teacherForm.email"
                                prepend-inner-icon="mdi-account" outlined
                                placeholder="Adresse email"></v-text-field>
                  <v-text-field required :rules="rules.teacher.password" v-model="teacherForm.password"
                                prepend-inner-icon="mdi-lock" type="password" clearable
                                outlined
                                placeholder="Mot de passe"></v-text-field>
                  <v-btn type="submit" block color="primary">Connexion</v-btn>
                </v-form>
              </v-card-text>
            </v-tab-item>
          </v-tabs-items>
        </v-container>
        <v-tabs v-model="tab" grow icons-and-text>
          <v-tab>Élève
            <v-icon>mdi-account</v-icon>
          </v-tab>
          <v-tab>Enseignant
            <v-icon>mdi-teach</v-icon>
          </v-tab>
        </v-tabs>
      </v-card>
    </v-row>
  </v-container>
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
      title: "Connexion"
    }),
    async asyncData() {
      await studentsStore.fetchStudents();
    }
  })
  export default class LoginPage extends Vue {

    [x: string]: any;

    @Ref("studentForm") studentFormRef!: HTMLFormElement;
    @Ref("teacherForm") teacherFormRef!: HTMLFormElement;

    tab = 0;
    loading = false;


    get students() {
      return studentsStore.studentsComboboxFormatted;
    }

    teacherForm = {
      email: "",
      password: ""
    };


    rules = {
      student: {
        input: [
          (v: string | null) => !!v || "Veuillez sélectionner un élève"
        ]
      },
      teacher: {
        email: [
          (v: string | null) => !!v || "Veuillez entrer une adresse email"
        ],
        password: [
          (v: string | null) => !!v || "Veuillez entrer un mot de passe"
        ]
      }
    };

    studentForm: number | null = null;

    //TODO - Login logic
    async submitStudent() {
      try {
        if (this.studentFormRef.validate() && this.studentForm) {
          this.loading = true;

          await studentStore.fetchStudent(this.studentForm);
          await this.$router.push("/student");
        }
      } catch ( e ) {
        //TODO - Error messages
        alert("Une erreur est survenue");
      } finally {
        this.loading = false;
      }
    }

    async submitTeacher() {
      try {
        if (this.teacherFormRef.validate()) {
          this.loading = true;
          const res = await $apollo.mutate({
            mutation: LoginTeacherMutationGQL,
            variables: {
              email: this.teacherForm.email,
              password: this.teacherForm.password
            } as LoginTeacherMutationVariables
          });

          this.$apolloHelpers.onLogin(res.data.loginTeacher.token);
          await this.$router.push("/teacher/contracts");
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
