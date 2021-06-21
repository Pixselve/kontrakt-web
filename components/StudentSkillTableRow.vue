<template>
  <tr>
    <th class="text-no-wrap">{{student.lastName}} {{student.firstName}}</th>
    <student-skill-table-cell :contract-i-d="contractID" v-on:update="() => $emit('update')" :skill="skill" :student="student" v-for="skill in skills" :key="skill.id"></student-skill-table-cell>
<!--    <td v-for="skill in skills" :key="skill.id" class="red lighten-3">-->
<!--      <v-select class="mt-6" flat dense outlined :items="selectValues"></v-select>-->
<!--    </td>-->
  </tr>
</template>

<script lang="ts">
  import { Vue, Component, Prop }                  from 'vue-property-decorator';
  import { Skill, Student } from "../types/types";
  import StudentSkillTableCell                     from "~/components/StudentSkillTableCell.vue";

  @Component({
    components: {
      StudentSkillTableCell
    }
  })
  export default class StudentSkillTableRow extends Vue {
    @Prop({ type: Object }) readonly student!: Student;
    @Prop({ type: Array }) readonly skills!: Skill
    @Prop() readonly contractID!: number;




  }
</script>
