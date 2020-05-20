<template>
  <v-form ref="form" @submit.prevent="login">
    <h1 class="mb-10">Connexion élève</h1>
    <v-alert type="warning"
    >À partir du 18 mai, la connexion par prénom et nom de famille sera
      impossible. Un identifiant vous sera transmis par email dans les plus
      brefs délais.
    </v-alert>
    <v-autocomplete
      required
      clearable
      :rules="rules.input"
      v-model="selectedStudent"
      :items="students"
      outlined
      prepend-inner-icon="mdi-account"
      label="Élève"
    >
    </v-autocomplete>
    <v-row align="center">
      <v-divider></v-divider>
      <h3 class="mx-5">ou</h3>
      <v-divider></v-divider>
    </v-row>
    <v-text-field
      autofocus
      v-model="username"
      type="number"
      class="mt-7"
      prepend-inner-icon="mdi-account"
      label="Identifiant"
      outlined
      :error-messages="errors.username"
    ></v-text-field>
    <v-row no-gutters>
      <v-btn to="/teacher/login" color="primary" text
      >Je suis un enseignant
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn :loading="loading" type="submit" color="primary">Connexion</v-btn>
    </v-row>
  </v-form>
</template>

<script lang="ts">

import { Component, Ref, Vue } from "vue-property-decorator";
import { studentsStore } from "~/utils/store-accessor";
import { $apollo } from "~/utils/getGraphQLClient";

import LoginStudentMutationGQL from "~/apollo/mutations/student/LoginStudent.graphql";
import LoginStudentOldMutationGQL from "~/apollo/mutations/student/LoginStudentOld.graphql";
import {
  LoginStudentMutation,
  LoginStudentMutationVariables,
  LoginStudentOldMutation,
  LoginStudentOldMutationVariables
} from "~/types/types";

@Component({
  head: () => ({
    title: "Connexion élève"
  }),
  layout: "login",
  async fetch() {
    await studentsStore.fetchStudents();
  }
})
export default class LoginPage extends Vue {
  @Ref("form") formRef!: HTMLFormElement;

  loading = false;
  selectedStudent: number | null = null;
  username: string = "";
  rules = {
    input: [(v: string | null) => v || "Veuillez sélectionner un élève"]
  };

  errors: { username: string[] } = {
    username: []
  };

  get students() {
    return studentsStore.studentsComboboxFormatted;
  }

  /**
   * Login the student
   */
  async login() {
    try {
      this.loading = true;
      this.errors.username = [];
      if (this.username.length >= 1) {
        //  The method of authentication used is the username
        const {
          data
        }: {
          data?: LoginStudentMutation | undefined | null;
        } = await $apollo.mutate({
          mutation: LoginStudentMutationGQL,
          variables: {
            username: parseInt(this.username)
          } as LoginStudentMutationVariables
        });
        if (data) {
          await this.$apolloHelpers.onLogin(data.loginStudent.token);
          this.$cookies.set("type", "STUDENT");
          await this.$router.push("/student");
        }
      } else {
        //  The method of authentication used is the user id based on firstName and lastName picker
        if (this.formRef.validate() && this.selectedStudent) {
          const {
            data
          }: {
            data?: LoginStudentOldMutation | undefined | null;
          } = await $apollo.mutate({
            mutation: LoginStudentOldMutationGQL,
            variables: {
              id: this.selectedStudent
            } as LoginStudentOldMutationVariables
          });
          if (data) {
            await this.$apolloHelpers.onLogin(data?.loginStudentOld.token);
            this.$cookies.set("type", "STUDENT");
            await this.$router.push("/student");
          }
        }
      }
    } catch (e) {
      console.log({ e });
      if (this.username.length >= 1) {
        //  The method of authentication used is the username
        if (e.message) {
          if (e.message.includes("INVALID_USER")) {
            this.errors.username.push("Utilisateur inconnu");
          }
        }
      } else {
        //  The method of authentication used is the user id based on firstName and lastName picker
      }
    } finally {
      this.loading = false;
    }
  }

  /**
   * Login the student with its username
   */
  async loginWithUsername() {
    //  Get the student's token with its username
    const {
      data
    }: {
      data?: LoginStudentMutation | undefined | null;
    } = await $apollo.mutate({
      mutation: LoginStudentMutationGQL,
      variables: {
        username: parseInt(this.username)
      } as LoginStudentMutationVariables
    });

    //  Login the student with the token and with a cookie of type STUDENT
    //  Redirect the student to /student
  }

  /**
   * Login the student with its id (based on the full name picker)
   */
  async loginWithId() {
    //  Get the student's token with its id
    //  Login the student with the token and with a cookie of type STUDENT
    //  Redirect the student to /student
  }
}
</script>
