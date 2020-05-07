<template>
  <v-card flat>
    <v-row justify="space-between" class="px-5" dense align="center">
      <v-col cols="1">
        <v-checkbox @change="checkChange" :value="checked"></v-checkbox>
      </v-col>
      <v-col>{{student.lastName.toUpperCase()}} {{student.firstName}}</v-col>
      <v-col>
        <div v-if="student.skillToStudents.length > 0" class="text-center">{{student.skillToStudents.length}}
          compétences à terminer
        </div>
        <div v-else class="text-center">À jour</div>
        <v-progress-linear :color="progressBarColor" height="7" rounded :value="progressBarValue"></v-progress-linear>
      </v-col>
      <v-col class="text-right">
        <v-btn :to="`/teacher/students/${student.id}`" icon>
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
  import { Component, Emit, Model, Prop, Vue } from 'vue-property-decorator';
  import { Maybe, SkillToStudent, Student } from "~/types/types";
  import 'reflect-metadata';

  @Component({
  })
  export default class StudentListItem extends Vue {
    @Prop() readonly highestAwaitingToFinishSkillCount!: number;
    @Prop() readonly student!: (
      { __typename?: 'Student' }
      & Pick<Student, 'id' | 'firstName' | 'lastName'>
      & {
      skillToStudents?: Maybe<Array<(
        { __typename?: 'SkillToStudent' }
        & Pick<SkillToStudent, 'id' | 'mark'>
        )>>
    }
      );

    @Model('input') readonly checked!: boolean;

    @Emit("input")
    checkChange(value: boolean) {
      return value;
    }


    get progressBarValue() {
      return ((this.highestAwaitingToFinishSkillCount - (this.student.skillToStudents?.length ?? this.highestAwaitingToFinishSkillCount)) * 100 / this.highestAwaitingToFinishSkillCount);
    }

    get progressBarColor() {
      if (this.progressBarValue >= 75) {
        return "green";
      } else if (this.progressBarValue >= 25) {
        return "orange";
      } else {
        return "red";
      }
    }


  }
</script>
