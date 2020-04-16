<template>
  <tr>
    <td>{{skill.name}}</td>
    <td v-if="editable">
      <v-select :loading="loading" hide-details dense outlined flat placeholder="Status de la compétence"
                v-model="mark"
                :items="selectValues"></v-select>
    </td>
    <td v-else>
      <v-chip label :color="textAndIcon.color" outlined>
        <v-avatar left>
          <v-icon>{{textAndIcon.icon}}</v-icon>
        </v-avatar>
        {{textAndIcon.text}}
      </v-chip>
    </td>
  </tr>
</template>
<script lang="ts">
  import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
  import { Mark, Skill, SkillToStudent } from "~/types/types";
  import { studentStore }                from "~/utils/store-accessor";

  @Component({})
  export default class SkillTableEntry extends Vue {
    @Prop({ type: Object }) readonly skill!: Skill;
    @Prop({ type: Array }) readonly studentSkills!: SkillToStudent[];
    @Prop({ type: Boolean }) readonly editable!: boolean;

    loading = false;


    selectValues = [
      { text: "À corriger", value: "AWAITING_CORRECTION" },
      { text: "Aquis", value: "GREEN" },
      { text: "Fait", value: "MARKED" },
      { text: "En cours d'aquisition", value: "ORANGE" },
      { text: "Non aquis", value: "RED" },
      { text: "À faire", value: "TODO", disabled: true },
    ];

    mark = this.textAndIcon.value;

    @Watch('mark')
    async onMarkChange(val: Mark, oldVal: Mark) {

      if (val != oldVal) {
        try {
          await this.editMark(val);
        } catch ( e ) {

          this.mark = oldVal;
        }
      }
    }


    async editMark(mark: Mark) {
      try {
        this.loading = true;
        await studentStore.editMarkSkillToStudent({ mark, skillId: this.skill.id });
      } catch ( e ) {
        alert("ERROR");
        console.error({ e });
      } finally {
        this.loading = false;
      }
    }


    markToIconAndText(mark: Mark) {
      switch (mark) {
        case Mark.AwaitingCorrection:
          return { text: "À corriger", icon: "mdi-marker", value: "AWAITING_CORRECTION", color: "purple" };
        case Mark.Green:
          return { text: "Aquis", icon: "mdi-emoticon-outline", value: "GREEN", color: "green" };
        case Mark.Marked:
          return { text: "Fait", icon: "mdi-bookmark-outline", value: "MARKED", color: "blue" };
        case Mark.Orange:
          return {
            text: "En cours d'aquisition",
            icon: "mdi-emoticon-neutral-outline",
            value: "ORANGE",
            color: "orange"
          };
        case Mark.Red:
          return { text: "Non aquis", icon: "mdi-emoticon-sad-outline", value: "RED", color: "red" };
      }
    }

    get textAndIcon() {
      const studentSkill = this.studentSkills.find(studentSkillToFound => studentSkillToFound.skill.id == this.skill.id);
      if (studentSkill) {
        return this.markToIconAndText(studentSkill.mark);
      } else {
        return { text: "À faire", icon: "mdi-clock-outline", value: "TODO", color: "grey" };
      }
    }


  }
</script>
