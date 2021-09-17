<template>
  <v-dialog v-model="dialog" max-width="600px" persistent>
    <template v-slot:activator="{ on }">
      <v-btn icon x-small v-on="on">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>Editer la compétence</v-card-title>
      <v-card-text>
        <v-text-field v-model="skill" placeholder="Compétence"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="dialog = false">Annuler</v-btn>
        <v-btn color="primary" @click="submit">Valider</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component({})
export default class EditSkillDialog extends Vue {

  @Prop(String) readonly skillProp!: string;
  @Prop(Number) readonly index!: number;
  skill = "";

  dialog = false;

  @Watch('dialog')
  onDialogChange(val: boolean, old: boolean) {
    if (!old && val) this.skill = this.skillProp;
  }

  submit() {
    this.$emit("edit", { skill: this.skill, index: this.index });
    this.dialog = false;
  }
}
</script>
