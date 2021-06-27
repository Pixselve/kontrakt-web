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
        <SkillTableEntry
          :editable="editable"
          v-for="studentSkill in studentSkills"
          :key="studentSkill.skillID"
          :student-skill="studentSkill"
        />
      </tbody>
    </template>
  </v-simple-table>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { StudentSkill } from "~/types/types";
import SkillTableEntry from "~/components/SkillTableEntry.vue";

@Component({
  components: { SkillTableEntry },
})
export default class SkillsTable extends Vue {
  @Prop({ type: Array }) readonly studentSkills!: StudentSkill[];
  @Prop({ type: Boolean }) readonly editable!: boolean;
}
</script>
