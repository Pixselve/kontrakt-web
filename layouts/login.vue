<template>
  <v-app>
    <v-main>
      <v-card
        color="transparent"
        class="mx-auto"
        flat
        max-width="500px"
      >
        <v-card-text class="text-center">
          <v-img
            width="50%"
            class="mx-auto mb-5"
            src="/logo_text_colored.svg"
          ></v-img>
          <nuxt/>
        </v-card-text>
      </v-card>
    </v-main>
  </v-app>
</template>

<script lang="ts">

  import { Component, Vue } from "vue-property-decorator";

  @Component({
    middleware: "redirectAlreadyConnected"
  })
  export default class LoginLayout extends Vue {

  }
</script>
