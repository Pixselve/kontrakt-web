<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" icon x-small>
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
        <v-btn @click="dialog = false" text color="primary">Annuler</v-btn>
        <v-btn @click="submit" color="primary">Valider</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
  import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

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
