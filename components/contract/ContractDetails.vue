<template>
  <v-row v-if="contract === undefined">
    <v-col cols="12">
      <v-skeleton-loader
        type="heading, list-item-avatar, list-item-avatar, list-item-avatar"
      ></v-skeleton-loader>
    </v-col>
  </v-row>
  <v-row v-else>
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
                  <v-menu offset-y>
                    <template v-slot:activator="{ on }">
                      <v-btn v-on="on" icon>
                        <v-icon>mdi-dots-vertical</v-icon>
                      </v-btn>
                    </template>
                    <v-list>
                      <contract-skill-add-dialog
                        :contract-i-d="contract.id"
                        v-on:update="() => $apollo.queries.contract.refetch()"
                      >
                        <template v-slot:default="{ on }">
                          <v-list-item v-on="on">
                            <v-list-item-avatar>
                              <v-icon>mdi-playlist-plus</v-icon>
                            </v-list-item-avatar>
                            <v-list-item-title
                            >Ajouter une compétence
                            </v-list-item-title
                            >
                          </v-list-item>
                        </template>
                      </contract-skill-add-dialog>

                      <v-list-item :to="`/teacher/contracts/${contract.id}`">
                        <v-list-item-avatar>
                          <v-icon>mdi-playlist-edit</v-icon>
                        </v-list-item-avatar>
                        <v-list-item-title
                        >Compléter les compétences
                        </v-list-item-title
                        >
                      </v-list-item>
                      <v-list-item @click="deleteContract">
                        <v-list-item-avatar>
                          <v-icon>mdi-delete</v-icon>
                        </v-list-item-avatar>
                        <v-list-item-title
                        >Supprimer le contrat
                        </v-list-item-title
                        >
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
          v-on:update="() => $apollo.queries.contract.refetch()"
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
import {
  ContractsDatesOnlyQuery,
  FetchContractQuery,
  FindManyGroupsQuery,
  UpdateContractGroupsMutation,
} from "~/types/types";
import GroupsSelector from "~/components/GroupsSelector.vue";
import FindManyGroupsGQL from "~/apollo/queries/groups/FindManyGroups.graphql";
import DeleteContractGQL from "~/apollo/mutations/DeleteContract.graphql";
import FetchContractGQL from "~/apollo/queries/FetchContract.graphql";
import UpdateContractGroupsGQL from "~/apollo/mutations/contract/UpdateContractGroups.graphql";
import FetchStudentsQueryGQL from "~/apollo/queries/FetchStudents.graphql";
import ContractsDatesOnlyQueryGQL from "~/apollo/queries/ContractsDatesOnly.graphql";

@Component<ContractDetails>({
  components: {
    ContractSkillAddDialog,
    ContractSkillListItemTeacherDashboard,
    GroupsSelector,
  },
  apollo: {
    groups: {
      query: FindManyGroupsGQL,
    },
    contract: {
      query: FetchContractGQL,
      variables() {
        return {
          id: this.id,
        };
      },
    },
  },
})
export default class ContractDetails extends Vue {
  @Prop() readonly id!: number;
  groups?: FindManyGroupsQuery["groups"];
  loading = false;
  contract?: FetchContractQuery["contract"];

  formattedDate(date: string) {
    return new Date(date).toLocaleDateString("fr-FR", {
      month: "long",
      day: "numeric",
    });
  }

  get contractGroups() {
    return this.contract?.groups?.map((group) => group.id) ?? [];
  }

  async groupChange(groups: number[]) {
    try {
      await this.$apollo.mutate({
        variables: {
          contractID: this.id,
          groups,
        },
        mutation: UpdateContractGroupsGQL,
        update: (proxy, { data }) => {
          const { updateOneContract } = data as UpdateContractGroupsMutation;
          // Update the current contract
          proxy.writeQuery({
            query: FetchContractGQL,
            variables: { id: this.id },
            data: { contract: updateOneContract },
          });
        },
        refetchQueries: [{ query: FetchStudentsQueryGQL }]
      });
    } catch (e) {
      console.log({ e });
    } finally {
    }
  }

  async deleteContract() {
    try {
      this.loading = true;
      await this.$apollo.mutate({
        mutation: DeleteContractGQL,
        variables: {
          id: this.id,
        },
        update: (proxy) => {
          const contractsData: ContractsDatesOnlyQuery | null = proxy.readQuery({ query: ContractsDatesOnlyQueryGQL });
          if (contractsData !== null) {
            proxy.writeQuery({
              query: ContractsDatesOnlyQueryGQL,
              data: { contracts: contractsData.contracts.filter(contract => contract.id !== this.id) }
            });
          }
        }
      });
      this.$emit("delete")
    } catch (e) {
      alert("Une erreur est survenue lors de la suppression du contrat");
      console.log({ e });
    } finally {
      this.loading = false;
    }
  }
}
</script>
