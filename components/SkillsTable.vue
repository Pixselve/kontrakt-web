<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
      <tr>
        <th class="text-left">Compétence</th>
        <th class="text-left">Status</th>
      </tr>
      </thead>
      <tbody>
      <SkillTableEntry :editable="editable" v-for="skill in skills" :key="skill.id" :skill="skill"
                       :student-skills="studentSkills"/>
      </tbody>
    </template>
  </v-simple-table>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { Skill } from "~/types/types";
  import SkillTableEntry from "~/components/SkillTableEntry.vue";
  import { studentStore } from "~/utils/store-accessor";

  @Component({
    components: { SkillTableEntry }
  })
  export default class SkillsTable extends Vue {
    @Prop({ type: Array }) readonly skills!: Skill[];
    @Prop({ type: Boolean, default: () => false }) readonly editable!: boolean;

    get studentSkills() {
      return studentStore.skillToStudents;
    }

  }
</script>
