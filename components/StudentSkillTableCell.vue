<template>
  <td :style="{backgroundColor: '#' + mark.rgb}">
    <v-select :disabled="loading" :loading="loading" @change="changeValue" :value="mark.value" class="mt-6" flat dense
              outlined
              :items="marks"></v-select>
  </td>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Mark, Skill, Student } from "~/types/types";
import { contractStore, marksStore } from "~/utils/store-accessor";

@Component({})
export default class StudentSkillTableCell extends Vue {
  @Prop({ type: Object }) readonly student!: Pick<Student, 'id' | 'firstName' | 'lastName'>;
  @Prop({ type: Object }) readonly skill!: Skill;


  loading = false;


  get mark(): ({ __typename?: "Mark" } & Pick<Mark, "text" | "value" | "rgb">) | undefined {
    return this.skill.skillToStudents?.find(skillToStudent => skillToStudent.student.id === this.student.id)?.mark ?? this.marks.find(mark => mark.value === "TODO");
  }



  get marks() {
    return marksStore.marks;
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
