import {Mark} from "~/types/types";
<template>
  <tr>
    <td>{{skill.name}}</td>
    <td v-if="editable">
      <v-select :loading="loading" hide-details dense outlined flat placeholder="Status de la compétence"
                :value="mark.value"
                @change="editMark"
                :items="marks"></v-select>
    </td>
    <td v-else>
      <v-chip label :color="'#' + mark.rgb" outlined>
        <v-avatar left>
          <v-icon>mdi-{{mark.icon}}</v-icon>
        </v-avatar>
        {{mark.text}}
      </v-chip>
    </td>
  </tr>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Mark, Skill, SkillToStudent } from "~/types/types";
import { marksStore, studentStore } from "~/utils/store-accessor";

@Component({})
export default class SkillTableEntry extends Vue {
  @Prop({ type: Object }) readonly skill!: Skill;
  @Prop({ type: Array }) readonly studentSkills!: SkillToStudent[];
  @Prop({ type: Boolean }) readonly editable!: boolean;

  loading = false;


  get marks() {
    return marksStore.marks;
  }


  get mark(): Mark | null | undefined {
    return this.studentSkills.find(studentSkill => studentSkill.skill.id === this.skill.id)?.mark;
  };


  async editMark(markValue: Mark["value"]) {
    try {
      this.loading = true;
      await studentStore.editMarkSkillToStudent({ markValue, skillId: this.skill.id });
    } catch (e) {
      alert("ERROR");
      console.error({ e });
    } finally {
      this.loading = false;
    }
  }


}
</script>
