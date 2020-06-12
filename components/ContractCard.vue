<template>
  <v-card @click="emitBack" hover>
<!--    <v-progress-linear color="orange" value="50"></v-progress-linear>-->
    <v-row align="center">
      <v-col cols="4">

        <v-row no-gutters class="text-center">
          <v-col class="font-weight-black display-1" cols="12">{{date.toLocaleDateString("fr-FR", {day: "numeric"})}}</v-col>
          <v-col cols="12">{{date.toLocaleDateString("fr-FR", {month: "long"}).toUpperCase()}}</v-col>
        </v-row>
      </v-col>
      <v-col>
        <slot>
        </slot>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator';

  @Component({})
  export default class ContractCard extends Vue {
    @Prop() readonly dateString!: string;

    get date() {
      return new Date(this.dateString)
    }


    emitBack() {
      this.$emit("click");
    }
  }
</script>
