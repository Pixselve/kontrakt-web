<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" icon x-small>
        <v-icon>mdi-playlist-edit</v-icon>
      </v-btn>
    </template>
    <v-progress-linear
      :active="loading"
      indeterminate
    ></v-progress-linear>
    <v-list dense>
      <v-list-item-group multiple v-model="content" @change="handleInput">
        <template v-for="group in groups">
          <v-list-item :value="group.id" dense :key="group.id">
            <template v-slot:default="{ active, toggle }">
              <v-list-item-action>
                <v-checkbox
                  :input-value="active"
                  dense
                  color="deep-purple accent-4"
                  @click.stop="toggle"
                  :true-value="group.id"
                ></v-checkbox>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ group.name }}</v-list-item-title>
              </v-list-item-content>
            </template>
          </v-list-item>
        </template>
      </v-list-item-group>
      <v-divider></v-divider>
      <CreateGroupDialog/>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import CreateGroupDialog from "~/components/CreateGroupDialog.vue";
import { Group } from "~/types/types";

@Component({
  components: { CreateGroupDialog }
})
export default class GroupsSelector extends Vue {
  @Prop() readonly groups!: Group;
  @Prop() readonly value!: number[];

  content = this.value;

  @Emit("input")
  handleInput() {
    return this.content;
  }


  loading = false;

}
</script>
