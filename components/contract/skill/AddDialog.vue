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
import { Component, Prop, Vue } from 'vue-property-decorator';
import  CreateOneSkillToContractGQL  from "~/apollo/mutations/skill/CreateOneSkillToContract.graphql";

@Component({})
export default class ContractSkillAddDialog extends Vue {
  opened = false;
  loading = false;
  name = "";
  @Prop() contractID!: number;

  async submit() {
    try {
      this.loading = true;
      await this.$apollo.mutate({
        mutation: CreateOneSkillToContractGQL,
        variables: {
          contractID: this.contractID,
          name: this.name
        }
      })
      this.$emit("update")
      this.opened = false;
    } catch (e) {
      console.log({ e });
    } finally {
      this.loading = false;
    }
  }

}
</script>
