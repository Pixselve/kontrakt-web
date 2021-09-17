<template>
  <v-dialog v-model="dialog" max-width="500px" persistent>
    <template v-slot:activator="{ on }">
      <v-list-item v-on.stop="on">
        <v-list-item-title>Nouveau</v-list-item-title>
      </v-list-item>
    </template>

    <v-card :loading="loading">
      <v-card-title>Ajouter un groupe</v-card-title>
      <v-form @submit.prevent="addGroup">
        <v-card-text>
          <v-text-field v-model="name" label="Nom" outlined required></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="close">Annuler</v-btn>
          <v-btn color="secondary" text type="submit">Ajouter</v-btn>
        </v-card-actions>
      </v-form>

    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { FindManyGroupsQuery } from "~/types/types";
import FindManyGroupsQueryGQL from "~/apollo/queries/groups/FindManyGroups.graphql";
import CreateGroupMutationGQL from "~/apollo/mutations/groups/CreateGroup.graphql";

@Component({})
export default class CreateGroupDialog extends Vue {
  loading = false;
  dialog = false;

  name = "";

  close() {
    this.dialog = false;
  }

  async addGroup() {
    try {
      this.loading = true;
      await this.$apollo.mutate({
        mutation: CreateGroupMutationGQL,
        variables: {
          name: this.name
        },
        update: (store, { data: { createOneGroup } }) => {
          // Read the data from our cache for this query.
          const data: FindManyGroupsQuery | null = store.readQuery({
            query: FindManyGroupsQueryGQL,
          });
          if (data !== null) {
            data.groups.push(createOneGroup);
          }
        },
      });
      this.dialog = false;
    } catch (e) {
      alert(e);
    } finally {
      this.loading = false;
    }
  }

}
</script>
