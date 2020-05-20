<template>
  <v-form lazy-validation ref="form" @submit.prevent="login">
    <h1 class="mb-10">Connexion élève</h1>
    <v-text-field
      autofocus
      :rules="rules.input"
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
import { LoginStudentMutation, LoginStudentMutationVariables } from "~/types/types";

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
  username: string = "";
  rules = {
    input: [(v: string) => v?.length === 6 || "Veuillez entrer un identifiant valide"]
  };
  errors: { username: string[] } = {
    username: []
  };


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
