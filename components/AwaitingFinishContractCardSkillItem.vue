<template>
  <v-list-item dense>

    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-list-item-icon v-on="on">
          <v-icon color="white">{{icon}}</v-icon>
        </v-list-item-icon>
      </template>
      <span>{{tooltipText}}</span>
    </v-tooltip>
    <v-list-item-content class="white--text">
      {{skill.name}}
    </v-list-item-content>
  </v-list-item>
</template>

<script lang="ts">
  import { Vue, Component, Prop }                                                         from 'vue-property-decorator';
  import { FetchContractsAwaitingFinishStudentQuery, Mark, Maybe, Skill, SkillToStudent } from "../types/types";

  @Component({})
  export default class AwaitingFinishContractCardSkillItem extends Vue {
    @Prop({ type: Object }) readonly skill!: (
      { __typename?: 'Skill' }
      & Pick<Skill, 'id' | 'name'>
      & {
      skillToStudents?: Maybe<Array<(
        { __typename?: 'SkillToStudent' }
        & Pick<SkillToStudent, 'id' | 'mark'>
        )>>
    }
      );

    get icon() {
      if (this.skill.skillToStudents && this.skill.skillToStudents.length > 0) {
        switch (this.skill.skillToStudents[0].mark) {
          case Mark.AwaitingCorrection:
            return "mdi-marker";
          case Mark.Green:
            return "mdi-emoticon-outline";
          case Mark.Marked:
            return "mdi-bookmark-outline";
          case Mark.Orange:
            return "mdi-emoticon-neutral-outline";
          case Mark.Red:
            return "mdi-emoticon-sad-outline";
          case Mark.Blue:
            return "mdi-emoticon-happy-outline";
          case Mark.ToFinish:
            return "mdi-view-dashboard-outline";
          default:
            return "mdi-clock-outline";
        }
      } else {
        return "mdi-clock-outline";
      }
    }


    get tooltipText() {
      if (this.skill.skillToStudents && this.skill.skillToStudents.length > 0) {
        switch (this.skill.skillToStudents[0].mark) {
          case Mark.AwaitingCorrection:
            return "À corriger";
          case Mark.Green:
            return "Aquis";
          case Mark.Marked:
            return "Fait";
          case Mark.Orange:
            return "En cours d'aquisition";
          case Mark.Red:
            return "Non aquis";
          case Mark.Blue:
            return "Aquis avec quelques erreurs";
          case Mark.ToFinish:
            return "À terminer";
          default:
            return "À faire";
        }
      } else {
        return "À faire";
      }
    }

  }
</script>
