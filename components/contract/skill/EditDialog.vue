<template>
  <v-dialog v-model="opened" max-width="500px" persistent>
    <template v-slot:activator="{ on }">
      <slot v-bind="{ on }"></slot>
    </template>
    <v-card :loading="loading">
      <v-form @submit.prevent="submit">
        <v-card-title>Editer ou supprimer la compétence</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="newName"
            label="Nouveau nom"
            outlined
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="opened = false" color="secondary" text>Annuler</v-btn>
          <v-btn @click="deleteSkill" dark color="red">Supprimer</v-btn>
          <v-btn type="submit" color="secondary">Changer le nom</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { contractStore } from "~/utils/store-accessor";

@Component({})
export default class ContractSkillEditDialog extends Vue {
  @Prop({ required: true }) readonly skillId!: number;
  opened = false;
  loading = false;

  newName = "";

  async submit() {
    try {
      this.loading = true;
      await contractStore.editSkillById({ id: this.skillId, newName: this.newName });
      this.opened = false;
    } catch (e) {
      console.log({ e });
    } finally {
      this.loading = false;
    }
  }


  async deleteSkill() {
    try {
      this.loading = true;
      await contractStore.deleteSkill(this.skillId);
      this.opened = false;
    } catch (e) {
      console.log({ e });
    } finally {
      this.loading = false;
    }
  }
}
</script>
