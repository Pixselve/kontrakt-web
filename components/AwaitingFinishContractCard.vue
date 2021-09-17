<template>
  <v-card :color="contract.hexColor" class="white--text" flat height="100%" hover shaped>
    <v-card-title class="px-6">
      <v-row no-gutters>
        <v-col cols="12"><h5>{{ contract.name }}</h5></v-col>
        <v-col cols="12"><h2>{{ contract.start | dateDayMonth }} - {{ contract.end | dateDayMonth }}</h2></v-col>
      </v-row>
    </v-card-title>
    <v-card-text>
      <SkillListItem v-for="skill in contract.skills" v-if="isMarkTodo(skillIDToMark.get(skill.id)) " :key="skill.id"
                     :mark="skillIDToMark.get(skill.id)" :skill="skill"/>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Contract, Mark } from "~/types/types";
import AwaitingFinishContractCardSkillItem from "~/components/AwaitingFinishContractCardSkillItem.vue";
import SkillListItem from "~/components/SkillListItem.vue";
import { MarkHelper } from "~/utils/MarkHelper";

@Component({
  components: {
    SkillListItem,
    AwaitingFinishContractCardSkillItem
  }
})
export default class AwaitingFinishContractCard extends Vue {
  @Prop({ type: Object }) readonly contract!: Contract;
  @Prop() readonly skillIDToMark!: Map<number, Mark>;

  isMarkTodo(mark: Mark) {
    return MarkHelper.isTodo(mark);
  }

}
</script>
