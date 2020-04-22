<template>
  <tr>
    <th class="text-no-wrap">{{student.lastName.toUpperCase()}} {{student.firstName}}</th>
    <student-skill-table-cell :skill="skill" :student="student" v-for="skill in skills" :key="skill.id"></student-skill-table-cell>
<!--    <td v-for="skill in skills" :key="skill.id" class="red lighten-3">-->
<!--      <v-select class="mt-6" flat dense outlined :items="selectValues"></v-select>-->
<!--    </td>-->
  </tr>
</template>

<script lang="ts">
  import { Vue, Component, Prop }                  from 'vue-property-decorator';
  import { Maybe, Skill, SkillToStudent, Student } from "../types/types";
  import StudentSkillTableCell                     from "~/components/StudentSkillTableCell.vue";

  @Component({
    components: {
      StudentSkillTableCell
    }
  })
  export default class StudentSkillTableRow extends Vue {
    @Prop({ type: Object }) readonly student!: Pick<Student, 'id' | 'firstName' | 'lastName'>;
    @Prop({ type: Array }) readonly skills!: Array<(
      { __typename?: 'Skill' }
      & Pick<Skill, 'id' | 'name'>
      & {
      skillToStudents?: Maybe<Array<(
        { __typename?: 'SkillToStudent' }
        & Pick<SkillToStudent, 'id' | 'mark'>
        & {
        student: (
          { __typename?: 'Student' }
          & Pick<Student, 'id' | 'firstName' | 'lastName'>
          )
      }
        )>>
    }
      )>;





  }
</script>
