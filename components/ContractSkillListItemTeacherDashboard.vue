<template>
  <v-list-item three-line>
    <v-list-item-action>
      <contract-skill-edit-dialog :skill-id="skill.id" v-on:update="() => $emit('update')">
        <template v-slot="{on}">
          <v-btn icon v-on="on">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </template>
      </contract-skill-edit-dialog>
    </v-list-item-action>
    <v-list-item-content>
      <v-list-item-title>{{ skill.name }}</v-list-item-title>
      <v-list-item-subtitle v-if="skillFinishedSkillToStudent.length > 0">
        {{ successSkillFinishedSkillToStudent.length }} des
        {{ skillFinishedSkillToStudent.length }} élèves ayant terminé la
        compétence l'ont parfaitement réussi
      </v-list-item-subtitle>
      <v-list-item-subtitle v-else
      >Personne n'a terminé la compétence
      </v-list-item-subtitle>
      <v-list-item-subtitle>
        <v-progress-linear
          :color="progressBarColor"
          :value="successSkillFinishedSkillToStudentPercentage"
        ></v-progress-linear>
      </v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Skill } from "~/types/types";
import ContractSkillEditDialog from "~/components/contract/skill/EditDialog.vue";
import { MarkHelper } from "~/utils/MarkHelper";

@Component({
  components: {
    ContractSkillEditDialog
  }
})
export default class ContractSkillListItemTeacherDashboard extends Vue {
  @Prop() readonly skill!: Skill;


  get progressBarColor() {
    if (this.successSkillFinishedSkillToStudentPercentage >= 75) {
      return "green";
    } else if (this.successSkillFinishedSkillToStudentPercentage >= 25) {
      return "orange";
    } else {
      return "red";
    }
  }

  get successSkillFinishedSkillToStudentPercentage() {
    return (
      (this.successSkillFinishedSkillToStudent.length * 100) /
      this.skillFinishedSkillToStudent.length
    );
  }

  get successSkillFinishedSkillToStudent() {
    return (
      this.skillFinishedSkillToStudent?.filter(skillToStudent =>
        MarkHelper.isPerfectlyDone(skillToStudent.mark)
      ) ?? []
    );
  }

  get skillFinishedSkillToStudent() {
    return (this.skill.studentSkills?.filter(skillToStudent => !MarkHelper.isTodo(skillToStudent.mark)) ?? []);
  }
}
</script>
