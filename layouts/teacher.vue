<template>
  <v-app>
    <v-content>
      <nuxt/>

    </v-content>
    <v-bottom-navigation color="secondary" app grow>
      <v-btn to="/teacher/students">
        <span>Élèves</span>
        <v-icon>mdi-account-group</v-icon>
      </v-btn>
      <v-btn to="/teacher/contracts">
        <span>Contrats</span>
        <v-icon>mdi-format-list-checks</v-icon>
      </v-btn>
      <v-btn @click="logout">
        <span>Deconnexion</span>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';

@Component({
  middleware: "teacherLogged"
})
export default class TeacherLayout extends Vue {
  // Logout the teacher
  async logout() {
    await this.$apolloHelpers.onLogout();
    this.$cookies.remove("type");
    await this.$router.push("/teacher/login");
  }
}
</script>
