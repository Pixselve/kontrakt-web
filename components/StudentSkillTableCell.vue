<template>
  <td :class="[color, 'lighten-3']">
    <v-select :disabled="loading" :loading="loading" @change="changeValue" :value="markValue" class="mt-6" flat dense
              outlined
              :items="selectValues"></v-select>
  </td>
</template>

<script lang="ts">
  import { Vue, Component, Prop }                        from 'vue-property-decorator';
  import { Maybe, Skill, SkillToStudent, Student, Mark } from "~/types/types";
  import { contractStore }                               from "~/utils/store-accessor";

  @Component({

  })
  export default class StudentSkillTableCell extends Vue {
    @Prop({ type: Object }) readonly student!: Pick<Student, 'id' | 'firstName' | 'lastName'>;
    @Prop({ type: Object }) readonly skill!: (
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
      );

    selectValues = [
      { text: "À faire", value: "TODO" },
      { text: "À terminer", value: "TO_FINISH" },
      { text: "À corriger", value: "AWAITING_CORRECTION" },
      { text: "Fait", value: "MARKED" },
      { text: "Aquis", value: "GREEN" },
      { text: "Aquis avec quelques erreurs", value: "BLUE" },
      { text: "En cours d'aquisition", value: "ORANGE" },
      { text: "Non aquis", value: "RED" },
    ];

    loading = false;

    get markValue() {
      return this.skill.skillToStudents?.find(skillToStudent => skillToStudent.student.id === this.student.id)?.mark ?? "TODO";
    };

    get color() {
      switch (this.markValue) {
        case Mark.AwaitingCorrection:
          return "purple";
        case Mark.Green:
          return "green";
        case Mark.Marked:
          return "pink";
        case Mark.Orange:
          return "orange";
        case Mark.Red:
          return "red";
        case Mark.Blue:
          return "blue";
        case Mark.ToFinish:
          return "brown";
        default:
          return "grey";
      }
    }


    async changeValue(newValue: Mark) {
      try {
        this.loading = true;
        await contractStore.editMarkSkillToStudent({
          mark: newValue,
          skillId: this.skill.id,
          studentId: this.student.id
        });
      } catch ( e ) {
        alert("ERREUR");
        console.log({ e });
      } finally {
        this.loading = false;
      }
    }


  }
</script>
