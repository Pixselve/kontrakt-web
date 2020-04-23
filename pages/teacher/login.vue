<template>
  <v-card :disabled="loading" class="mx-auto" flat max-width="500px">

    <v-card-text class="text-center">

      <v-avatar class="mb-5" color="purple">
        <v-icon dark>mdi-teach</v-icon>
      </v-avatar>
      <h1 class="mb-10">Connexion enseignant</h1>
      <v-form ref="form" @submit.prevent="login">
        <v-text-field v-model="form.email" validate-on-blur :error-messages="errors.email" :rules="rules.email" outlined
                      type="email" required autofocus
                      label="Adresse email"></v-text-field>
        <v-text-field v-model="form.password" validate-on-blur :error-messages="errors.password" :rules="rules.password"
                      type="password" outlined required label="Mot de passe"></v-text-field>

        <v-row no-gutters>
          <v-btn to="/login" color="primary" text>Je suis un élève</v-btn>
          <v-spacer></v-spacer>
          <v-btn :loading="loading" type="submit" color="primary">Connexion</v-btn>
        </v-row>
      </v-form>

    </v-card-text>

  </v-card>
</template>

<script lang="ts">
  import { Vue, Component, Ref }           from 'vue-property-decorator';
  import { $apollo }                       from "~/utils/getGraphQLClient";
  import LoginTeacherMutationGQL           from "~/apollo/mutations/LoginTeacher.graphql";
  import { LoginTeacherMutationVariables } from "~/types/types";

  @Component({
    head: () => ({
      title: "Connexion enseignant"
    }),
  })
  export default class TeacherLoginPage extends Vue {

    @Ref("form") readonly formRef!: HTMLFormElement;


    loading = false;


    form = {
      email: "",
      password: ""
    };

    rules = {
      email: [
        (v: string | null) => !!v || "Veuillez entrer une adresse email"
      ],
      password: [
        (v: string | null) => !!v || "Veuillez entrer un mot de passe"
      ]
    };

    errors = {
      email: "",
      password: ""
    };

    /**
     * Login the teacher
     */
    async login() {
      try {
        this.errors = {
          email: "",
          password: ""
        };
        if (this.formRef.validate()) {
          this.loading = true;
          const res = await $apollo.mutate({
            mutation: LoginTeacherMutationGQL,
            variables: {
              email: this.form.email,
              password: this.form.password
            } as LoginTeacherMutationVariables
          });
          await this.$apolloHelpers.onLogin(res.data.loginTeacher.token);
          await this.$router.push("/teacher/contracts");
        }
      } catch ( e ) {
        console.log({ e });
        if (e.message) {
          if (e.message.includes("INVALID_USER")) {
            this.errors.email = "Cet utilisateur n'existe pas";
          } else if (e.message.includes("INVALID_PASSWORD")) {
            this.errors.password = "Mot de passe incorect";
          } else {
            this.errors.email = "Une erreur est survenue";
          }
        } else {
          this.errors.email = "Une erreur est survenue";
        }
      } finally {
        this.loading = false;
      }
    }
  }
</script>
