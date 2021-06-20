<template>
  <v-form lazy-validation ref="form" @submit.prevent="login">
    <h1 class="mb-10">Connexion</h1>
    <v-text-field
      autofocus
      :rules="rules.username"
      v-model="username"
      type="text"
      class="mt-7"
      prepend-inner-icon="mdi-account"
      label="Identifiant"
      outlined
      required
      :error-messages="errors.username"
    ></v-text-field>
    <v-text-field
      required
      label="Mot de passe"
      :rules="rules.password"
      outlined
      type="password"
      v-model="password"
      :error-messages="errors.password"
      prepend-inner-icon="mdi-lock"
    ></v-text-field>
    <v-row no-gutters>
      <v-btn block :loading="loading" type="submit" color="primary">Connexion</v-btn>
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
  password = ""
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
