<template>
  <td>
    <v-select :disabled="loading" :loading="loading" @change="changeValue" :value="mark" class="mt-6" flat dense
              outlined
              :items="marks"></v-select>
  </td>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Mark, Skill, Student } from "~/types/types";

@Component({})
export default class StudentSkillTableCell extends Vue {
  @Prop({ type: Object }) readonly student!: Student;
  @Prop({ type: Object }) readonly skill!: Skill;
  marks = [
    {
      text: "À faire",
      value: Mark.Todo
    }
  ]
  loading = false;
  get mark() {
    return this.student.studentSkills.find(studentSkill => studentSkill.skillID === this.skill.id)?.mark ?? Mark.Todo
  }

  async changeValue(newValue: string) {
    try {
      this.loading = true;
      await contractStore.editMarkSkillToStudent({
        markValue: newValue,
        skillId: this.skill.id,
        studentId: this.student.id
      });
    } catch (e) {
      alert("ERREUR");
      console.log({ e });
    } finally {
      this.loading = false;
    }
  }


}
</script>
