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
          <v-btn color="secondary" text @click="opened = false">Annuler</v-btn>
          <v-btn color="red" dark @click="deleteSkill">Supprimer</v-btn>
          <v-btn color="secondary" type="submit">Changer le nom</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import EditSkillNameGQL from "~/apollo/mutations/skill/EditSkillName.graphql";
import DeleteSkillGQL from "~/apollo/mutations/skill/DeleteSkill.graphql";

@Component({})
export default class ContractSkillEditDialog extends Vue {
  @Prop({ required: true }) readonly skillId!: number;
  opened = false;
  loading = false;

  newName = "";

  async submit() {
    try {
      this.loading = true;
      await this.$apollo.mutate({
        mutation: EditSkillNameGQL,
        variables: {
          name: this.newName,
          id: this.skillId
        }
      });
      this.$emit("update");
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
      await this.$apollo.mutate({
        mutation: DeleteSkillGQL,
        variables: {
          id: this.skillId
        }
      });
      this.$emit("update");
      this.opened = false;
    } catch (e) {
      console.log({ e });
    } finally {
      this.loading = false;
    }
  }
}
</script>
