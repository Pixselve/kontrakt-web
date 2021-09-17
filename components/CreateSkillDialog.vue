<template>
  <v-dialog v-model="dialog" max-width="600px" persistent>
    <template v-slot:activator="{ on }">
      <v-btn block color="primary" v-on="on">Ajouter une compétence</v-btn>
    </template>
    <v-card>
      <v-form ref="form" @submit.prevent="submit">
        <v-card-title>Ajouter une compétence</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="skill"
            :rules="rules"
            autofocus
            label="Compétence"
            outlined
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="close">Annuler</v-btn>
          <v-btn color="primary" type="submit">Ajouter</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Ref, Vue } from "vue-property-decorator";

@Component({})
export default class CreateSkillDialog extends Vue {
  @Ref("form") readonly form!: HTMLFormElement;
  dialog = false;
  skill = "";


  rules = [
    (v: string) => v.length > 0 || "Veuillez entrer un nom"
  ];

  reset() {
    this.skill = "";
    this.form.resetValidation();
  }

  close() {
    this.dialog = false;
    this.reset();
  }

  submit() {
    if (this.form.validate()) {
      this.$emit("submit", this.skill);
      this.close();
    }

  }
}
</script>
