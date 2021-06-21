<template>
  <v-list-item dense>

    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-list-item-icon v-on="on">
          <v-icon color="white">mdi-{{skill.skillToStudent.mark.icon}}</v-icon>
        </v-list-item-icon>
      </template>
      <span>{{skill.skillToStudent.mark.text}}</span>
    </v-tooltip>
    <v-list-item-content class="white--text">
      {{skill.name}}
    </v-list-item-content>
  </v-list-item>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { FetchContractsAwaitingFinishStudentQuery, Skill } from "../types/types";

@Component({})
export default class AwaitingFinishContractCardSkillItem extends Vue {
  // @Prop({ type: Object }) readonly skill!: FetchContractsAwaitingFinishStudentQuery["findManyContractNotFinishedByStudent"][0]["skills"][0];
// TODO



}
</script>
