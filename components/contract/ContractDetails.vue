<template>
  <v-row>
    <v-col cols="12">
      <v-row no-gutters>
        <v-list flat>
          <v-list-item two-line>
            <v-list-item-avatar>
              <v-avatar :color="contract.hexColor" size="20"></v-avatar>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                <v-row no-gutters align="center">
                  <h2 class="mr-5">{{ contract.name }}</h2>
                  <v-menu offset-y >
                    <template v-slot:activator="{ on }">
                      <v-btn v-on="on" icon>
                        <v-icon>mdi-dots-vertical</v-icon>
                      </v-btn>
                    </template>
                    <v-list>
                      <contract-skill-add-dialog>
                        <template v-slot:default="{ on }">
                          <v-list-item v-on="on">
                            <v-list-item-avatar>
                              <v-icon>mdi-playlist-plus</v-icon>
                            </v-list-item-avatar>
                            <v-list-item-title>Ajouter une compétence</v-list-item-title>
                          </v-list-item>
                        </template>
                      </contract-skill-add-dialog>

                      <v-list-item :to="`/teacher/contracts/${contract.id}`">
                        <v-list-item-avatar>
                          <v-icon>mdi-playlist-edit</v-icon>
                        </v-list-item-avatar>
                        <v-list-item-title>Compléter les compétences</v-list-item-title>
                      </v-list-item>
                      <v-list-item @click="deleteContract">
                        <v-list-item-avatar>
                          <v-icon>mdi-delete</v-icon>
                        </v-list-item-avatar>
                        <v-list-item-title>Supprimer le contrat</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-row>

              </v-list-item-title>
              <v-list-item-subtitle>
                {{ formattedDate(contract.start) }} -
                {{ formattedDate(contract.end) }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item two-line>
            <v-list-item-avatar>
              <v-icon>mdi-select-group</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                <v-row no-gutters align="center">
                  <v-chip-group v-if="contract.groups.length > 0">
                    <v-chip
                      label
                      color="primary"
                      small
                      v-for="group in contract.groups"
                      :key="group.id"
                      >{{ group.name }}
                    </v-chip>
                  </v-chip-group>
                  <span v-else>Le contrat n'est pas accessible</span>
                  <groups-selector
                    @input="groupChange"
                    :value="contractGroups"
                    :groups="groups"
                  ></groups-selector>
                </v-row>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>


      </v-row>
    </v-col>
    <!--    <v-col v-for="i in 3">-->
    <!--      <v-card>-->
    <!--        <v-card-title>Élèves ayant terminé le contrat</v-card-title>-->
    <!--        <v-card-text class="text-center">-->
    <!--          <v-progress-circular size="100" width="10" value="95" color="red"-->
    <!--          ><h2>25%</h2></v-progress-circular-->
    <!--          >-->
    <!--        </v-card-text>-->
    <!--      </v-card>-->
    <!--    </v-col>-->
    <v-col cols="12">
      <v-list>
        <contract-skill-list-item-teacher-dashboard
          :skill="skill"
          v-for="skill in contract.skills"
          :key="skill.id"
        ></contract-skill-list-item-teacher-dashboard>
      </v-list>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ContractSkillAddDialog from "~/components/contract/skill/AddDialog.vue";
import ContractSkillListItemTeacherDashboard from "~/components/ContractSkillListItemTeacherDashboard.vue";
import { FetchContractQuery, FindManyGroupsQuery } from "~/types/types";
import GroupsSelector from "~/components/GroupsSelector.vue";
import FindManyGroupsGQL from "~/apollo/queries/groups/FindManyGroups.graphql";

@Component<ContractDetails>({
  components: {
    ContractSkillAddDialog,
    ContractSkillListItemTeacherDashboard,
    GroupsSelector
  },
  async fetch(): Promise<void> {
    const { data }: { data: FindManyGroupsQuery } = await this.$apollo.query({
      query: FindManyGroupsGQL,
    });
    this.groups = data.groups
  },
})
export default class ContractDetails extends Vue {
  @Prop() readonly contract!: FetchContractQuery["contract"];
  groups: FindManyGroupsQuery["groups"] = []
  loading = false;

  formattedDate(date: string) {
    return new Date(date).toLocaleDateString("fr-FR", {
      month: "long",
      day: "numeric"
    });
  }

  get contractGroups() {
    return this.contract?.groups?.map(group => group.id) ?? [];
  }

  async groupChange(groups: number[]) {
    try {
      await contractStore.updateGroups(groups);
    } catch (e) {
      console.log({ e });
    } finally {
    }
  }

  async deleteContract() {
    try {
      this.loading = true;
      await contractStore.deleteContract();
      await contractsStore.fetchContracts();
    } catch (e) {
      alert("Une erreur est survenue lors de la suppression du contrat");
      console.log({ e });
    } finally {
      this.loading = false;
    }
  }
}
</script>
