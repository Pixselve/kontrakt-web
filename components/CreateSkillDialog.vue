<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" color="primary" block>Ajouter une compétence</v-btn>
    </template>
    <v-card>
      <v-card-title>Ajouter une compétence</v-card-title>
      <v-card-text>
        <v-text-field v-model="skill" placeholder="Compétence"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="close" text color="primary">Annuler</v-btn>
        <v-btn @click="submit" color="primary">Ajouter</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';

  @Component({})
  export default class CreateSkillDialog extends Vue {
    dialog = false;
    skill = "";

    reset() {
      this.skill = "";
    }

    close() {
      this.dialog = false;
      this.reset();
    }

    submit() {
      this.$emit("submit", this.skill);
      this.close();
    }
  }
</script>
