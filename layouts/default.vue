<template>
  <v-app>
    <v-content>
      <nuxt/>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import "reflect-metadata"
  import { Component, Vue } from 'vue-property-decorator';



  @Component({})
  export default class DefaultLayout extends Vue {

  }
</script>
