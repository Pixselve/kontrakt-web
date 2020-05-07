<template>
  <v-app>
    <v-content>
      <nuxt/>
    </v-content>
  </v-app>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';

  @Component({
    middleware: "redirectAlreadyConnected"
  })
  export default class DefaultLayout extends Vue {

  }
</script>
