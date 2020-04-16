<template>
  <v-app>
    <v-content>
      <nuxt/>
      <v-bottom-navigation grow fixed>
        <v-btn to="/teacher/students">
          <span>Élèves</span>
          <v-icon>mdi-account-group</v-icon>
        </v-btn>
        <v-btn to="/teacher/contracts">
          <span>Contrats</span>
          <v-icon>mdi-format-list-checks</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </v-content>
  </v-app>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';

  @Component({
    middleware: "teacherLogged"
  })
  export default class TeacherLayout extends Vue {

  }
</script>
