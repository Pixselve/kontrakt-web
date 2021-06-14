<template>
  <v-dialog v-model="opened" max-width="500px" persistent>
    <template v-slot:activator="{ on }">
      <slot v-bind="{ on }"></slot>
    </template>
    <v-card :loading="loading">
      <v-form @submit.prevent="submit">
        <v-card-title>Ajouter une compétence</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="name"
            label="Nom"
            outlined
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="opened = false" color="secondary" text>Annuler</v-btn>
          <v-btn type="submit" color="secondary">Ajouter</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class ContractSkillAddDialog extends Vue {
  opened = false;
  loading = false;
  name = "";

  async submit() {
    try {
      this.loading = true;
      await contractStore.addSkillToContract(this.name);
      this.opened = false;
    } catch (e) {
      console.log({ e });
    } finally {
      this.loading = false;
    }
  }

}
</script>
