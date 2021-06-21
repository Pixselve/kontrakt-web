<template>
  <v-card>
    <v-card-title>
          Contrat du
          {{
            new Date(contract.start).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
            })
          }}
          au
          {{
            new Date(contract.end).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
            })
          }}

    </v-card-title>
    <v-card-text>
      <v-progress-linear
        indeterminate
        v-if="$fetchState.pending"
        color="primary"
      ></v-progress-linear>
      <skills-table
        v-else
        :editable="editable"
        :student-skills="studentSkills"
        :skills="contract.skills"
      ></skills-table>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="orange" outlined tile @click="() => $emit('close')">
        <v-icon left>mdi-close-circle-outline</v-icon>
        Fermer
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import SkillsTable from "~/components/SkillsTable.vue";
import { Contract, StudentSkillsQuery } from "~/types/types";
import StudentSkillsGQL from "~/apollo/queries/StudentSkills.graphql";

@Component<ContractPopup>({
  components: {
    SkillsTable,
  },
  async fetch() {
    const { data }: { data: StudentSkillsQuery } =
      await this.$apollo.query({
        query: StudentSkillsGQL,
        variables: {
          studentUsername: this.studentUsername,
        },
      });
    this.studentSkills = data.studentSkills
  },
  fetchOnServer: false,
})
export default class ContractPopup extends Vue {
  @Prop({ type: Object }) readonly contract!: Contract;
  @Prop({ type: Boolean, default: () => false }) readonly editable!: boolean;
  @Prop() readonly studentUsername!: string;
  studentSkills: StudentSkillsQuery["studentSkills"] = []
}
</script>
