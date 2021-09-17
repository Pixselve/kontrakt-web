<template>
  <v-app>
    <v-main>
      <v-card class="mx-auto" color="transparent" flat max-width="500px">
        <v-card-text class="text-center">
          <kontrakt-logo class="mb-5 mx-auto"/>
          <nuxt/>
        </v-card-text>
      </v-card>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import KontraktLogo from "~/components/KontraktLogo.vue";

@Component({
  components: { KontraktLogo },
  middleware: "redirectAlreadyConnected",
})
export default class LoginLayout extends Vue {
}
</script>
