<template>
  <v-form ref="form" lazy-validation @submit.prevent="login">
    <h1 class="mb-10">Connexion</h1>
    <v-text-field
      id="username"
      v-model="username"
      :error-messages="errors.username"
      :rules="rules.username"
      autofocus
      class="mt-7"
      label="Identifiant"
      outlined
      prepend-inner-icon="mdi-account"
      required
      type="text"
    ></v-text-field>
    <v-text-field
      id="password"
      v-model="password"
      :error-messages="errors.password"
      :rules="rules.password"
      label="Mot de passe"
      outlined
      prepend-inner-icon="mdi-lock"
      required
      type="password"
    ></v-text-field>
    <v-row no-gutters>
      <v-btn :loading="loading" block color="primary" type="submit">Connexion</v-btn>
    </v-row>
  </v-form>
</template>

<script lang="ts">
import { Component, Ref, Vue } from "vue-property-decorator";
import { $apollo } from "~/utils/getGraphQLClient";
import LoginMutationGQL from "~/apollo/mutations/Login.graphql";

@Component({
  head: () => ({
    title: "Connexion élève",
  }),
  layout: "login",
})
export default class LoginPage extends Vue {
  @Ref("form") formRef!: HTMLFormElement;

  loading = false;
  username: string = "";
  password = "";
  rules = {
    username: [
      (v: string) => !!v || "Veuillez entrer un identifiant valide",
    ],
    password: [
      (v: string) => !!v || "Veuillez entrer un mot de passe valide",
    ]
  };
  errors: { password: string[]; username: string[] } = {
    username: [],
    password: []
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
          data,
        } = await $apollo.mutate({
          mutation: LoginMutationGQL,
          variables: {
            username: this.username,
            password: this.password
          }
        });
        if (data) {
          await this.$apolloHelpers.onLogin(data.login.token);
          this.$cookies.set("role", data.login.user.role);
          if (data.login.user.role === "TEACHER") {
            await this.$router.push("/teacher/contracts");
          } else {
            await this.$router.push("/student");
          }

        }
      }
    } catch (e) {
      console.log({ e });
      if (this.username.length >= 1) {
        //  The method of authentication used is the username
        if (e.message) {
          if (e.message.includes("ErrNotFound")) {
            this.errors.username.push("Utilisateur inconnu");
          } else if (e.message.includes("bad password")) {
            this.errors.password.push("Mot de passe incorrect");
          }
        }
      } else {
        //  The method of authentication used is the user id based on firstName and lastName picker
      }
    } finally {
      this.loading = false;
    }
  }
}
</script>
