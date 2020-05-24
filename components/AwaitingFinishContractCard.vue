<template>
  <v-card height="100%" flat hover shaped class="white--text" :color="color">
    <v-card-title class="px-6">
      <v-row no-gutters>
        <v-col cols="12"><h5>{{contract.name}}</h5></v-col>
        <v-col cols="12"><h2>{{contract.date | dateDayMonth}} - {{contract.end | dateDayMonth}}</h2></v-col>
      </v-row>
    </v-card-title>
    <v-card-text>
      <awaiting-finish-contract-card-skill-item :key="skill.id" v-for="skill in contract.skills"
                                                :skill="skill"></awaiting-finish-contract-card-skill-item>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
  import { Vue, Component, Prop }                           from 'vue-property-decorator';
  import { FetchContractsAwaitingFinishStudentQuery, Mark } from "~/types/types";
  import AwaitingFinishContractCardSkillItem                from "~/components/AwaitingFinishContractCardSkillItem.vue";

  @Component({
    components: {
      AwaitingFinishContractCardSkillItem
    }
  })
  export default class AwaitingFinishContractCard extends Vue {
    @Prop({ type: Object }) readonly contract!: FetchContractsAwaitingFinishStudentQuery["contracts"][0];

    colors = ["red", "pink", "purple", "indigo", "blue", "cyan", "teal", "green", "orange", "brown"];

    get color() {
      return this.colors[Math.floor(Math.random() * this.colors.length)];
    }

  }
</script>
