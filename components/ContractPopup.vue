<template>
  <v-dialog v-model="dialog" max-width="500">
    <template v-slot:activator="{ on }">
      <slot v-bind:on="on"></slot>
    </template>
    <v-card>
<!--      <v-progress-linear color="orange" value="50"></v-progress-linear>-->
      <v-card-title>
        <v-row align-content="center" no-gutters justify="space-between">
          <v-col>Contrat du {{new Date(contract.date).toLocaleDateString("fr-FR", {day: "numeric", month: "long"})}}</v-col>
          <v-col>
<!--            <div class="text-right orange&#45;&#45;text overline">50% complété</div>-->
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text>
        <skills-table :editable="editable" :student-skills="studentSkills" :skills="contract.skills"></skills-table>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="orange" outlined tile @click="dialog = false">
          <v-icon left>mdi-close-circle-outline</v-icon>
          Fermer
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
  import { Vue, Component, Ref, Prop } from 'vue-property-decorator';
  import SkillsTable                   from "~/components/SkillsTable.vue";
  import { Contract }                  from "~/types/types";
  import { studentStore }              from "~/utils/store-accessor";

  @Component({
    components: {
      SkillsTable
    }
  })
  export default class ContractPopup extends Vue {
    @Prop({ type: Object }) readonly contract!: Contract;
    @Prop({ type: Boolean, default: () => false }) readonly editable!: boolean;
    dialog = false;


    get studentSkills() {
      return studentStore.skillToStudents;
    }
  }
</script>
