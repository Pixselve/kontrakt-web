<template>
  <td :style="`background-color: ${markData.hexColor};`">
    <v-select :disabled="loading" :items="marks" :loading="loading" :value="mark" class="mt-6" dense flat
              outlined
              @change="changeValue"></v-select>
  </td>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { FetchStudentForContractQuery, Mark, Skill, Student } from "~/types/types";
import EditSkillToStudentGQL from "~/apollo/mutations/EditSkillToStudent.graphql";
import FetchStudentForContractGQL from "~/apollo/queries/FetchStudentForContract.graphql";
import { MarkHelper } from "~/utils/MarkHelper";

@Component({})
export default class StudentSkillTableCell extends Vue {
  @Prop() readonly student!: Student;
  @Prop() readonly skill!: Skill;
  @Prop() readonly contractID!: number;
  loading = false;
  mark: Mark = Mark.Todo;

  get marks() {
    return MarkHelper.marks;
  }

  get markData() {
    return MarkHelper.markToData.get(this.mark);
  }

  @Watch("student", { deep: true, immediate: true })
  onStudentChange(student: Student) {
    this.mark = student.studentSkills.find(studentSkill => studentSkill.skillID === this.skill.id)?.mark ?? Mark.Todo;
  }

  async changeValue(newValue: string) {
    try {
      this.loading = true;
      await this.$apollo.mutate({
        mutation: EditSkillToStudentGQL, variables: {
          mark: newValue,
          skillID: this.skill.id,
          studentOwnerUsername: this.student.ownerUsername,
          contractID: this.contractID
        },
        update: (store, { data: { upsertOneSkillToStudent } }) => {
          // Read the data from our cache for this query.
          const data: FetchStudentForContractQuery | null = store.readQuery({
            query: FetchStudentForContractGQL,
            variables: { contractID: this.contractID }
          });
          if (data) {
            // Add our tag from the mutation to the end
            const studentIndex = data?.students.findIndex(student => student.ownerUsername === this.student.ownerUsername);
            if (studentIndex !== undefined && studentIndex >= 0) {
              const studentSkillIndex = data?.students[studentIndex].studentSkills.findIndex(studentSkill => studentSkill.skillID === this.skill.id);
              if (studentSkillIndex !== undefined && studentSkillIndex >= 0) {
                data.students[studentIndex].studentSkills[studentSkillIndex] = upsertOneSkillToStudent;
              } else {
                data.students[studentIndex].studentSkills.push(upsertOneSkillToStudent);
              }
              // Write our data back to the cache.
              store.writeQuery({ query: FetchStudentForContractGQL, data });
              this.mark = upsertOneSkillToStudent.mark;
            }
          }


        }
      });
      this.$emit("update");
    } catch (e) {
      alert("ERREUR");
      console.log({ e });
    } finally {
      this.loading = false;
    }
  }


}
</script>
