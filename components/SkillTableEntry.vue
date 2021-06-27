<template>
  <tr>
    <td>{{ studentSkill.skill.name }}</td>
    <td v-if="editable">
      <!--      <v-select :loading="loading" hide-details dense outlined flat placeholder="Status de la compétence"-->
      <!--                :value="mark.value"-->
      <!--                @change="editMark"-->
      <!--                :items="marks"></v-select>-->
    </td>
    <td v-else>
            <v-chip label :color="mark.hexColor" outlined>
              <v-avatar left>
                <v-icon>mdi-{{mark.icon}}</v-icon>
              </v-avatar>
              {{mark.text}}
            </v-chip>
    </td>
  </tr>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Mark, Skill, StudentSkill } from "~/types/types";
import { MarkHelper } from "~/utils/MarkHelper";

@Component({})
export default class SkillTableEntry extends Vue {
  @Prop({ type: Object }) readonly studentSkill!: StudentSkill;
  @Prop({ type: Boolean }) readonly editable!: boolean;

  loading = false;

  get mark() {
    return MarkHelper.markToData.get(this.studentSkill.mark)
  }

  async editMark(markValue: Mark) {
    // TODO
    // try {
    //   this.loading = true;
    //   await studentStore.editMarkSkillToStudent({
    //     markValue,
    //     skillId: this.skill.id,
    //   });
    // } catch (e) {
    //   alert("ERROR");
    //   console.error({ e });
    // } finally {
    //   this.loading = false;
    // }
  }
}
</script>
