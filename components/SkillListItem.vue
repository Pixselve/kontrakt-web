<template>
  <v-list-item dense dark>
    <v-list-item-icon v-on="on">
      <v-icon color="white">mdi-{{ markData.icon }}</v-icon>

    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title>{{ skill.name }}</v-list-item-title>
      <v-list-item-subtitle>{{ markData.text }}</v-list-item-subtitle>

    </v-list-item-content>
  </v-list-item>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Mark, Skill } from "~/types/types";
import { MarkHelper } from "~/utils/MarkHelper";

@Component({})
export default class SkillListItem extends Vue {
  @Prop() readonly skill!: Skill;
  @Prop() readonly mark!: Mark;

  get markData() {
    return MarkHelper.markToData.get(this.mark)
  }
}
</script>
