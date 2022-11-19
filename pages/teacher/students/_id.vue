<template>
  <div>
    <v-app-bar flat>
      <v-btn icon @click="exitPage">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title
      >{{ student.firstName }} {{ student.lastName }}
      </v-toolbar-title>
      <template v-slot:extension>
        <v-tabs v-model="tab" centered grow>
          <v-tab>
            <v-icon left>mdi-note</v-icon>
            Contrats
          </v-tab>
          <v-tab>
            <v-icon left>mdi-cogs</v-icon>
            Paramètres
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-container>
          <h1>Les contrats</h1>
          <v-divider></v-divider>
          <v-container>
            <v-row>
              <v-col
                v-for="contract in contracts"
                :key="contract.id"
                cols="12"
                lg="4"
                md="6"
                sm="12"
                xl="3"
              >
                <contract-card-with-popup
                  :contract="contract"
                  :editable="true"
                  :student-username="student.ownerUsername"
                ></contract-card-with-popup>
              </v-col>
            </v-row>
          </v-container>

        </v-container>
      </v-tab-item>
      <v-tab-item>
        <v-container>
          <v-btn block color="red" @click="deleteStudent"
          >Supprimer l'élève
          </v-btn>
        </v-container>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SkillsTable from "~/components/SkillsTable.vue";
import ContractCardWithPopup from "~/components/ContractCardWithPopup.vue";
import { Contract, FetchStudentQuery, FindManyContractsOfGroupsQuery, } from "~/types/types";

import FetchStudentQueryGQL from "~/apollo/queries/FetchStudent.graphql";
import FindManyContractsOfGroupsQueryGQL from "~/apollo/queries/contact/FindManyContractsOfGroups.graphql";
import DeleteStudentGQL from "~/apollo/mutations/student/DeleteStudent.graphql";

@Component<StudentSpecificPage>({
  async asyncData({ params, app, redirect }) {
    try {
      let client = app.apolloProvider.defaultClient;
      const { data: studentData }: { data: FetchStudentQuery } =
        await client.query({
          query: FetchStudentQueryGQL,
          variables: {
            id: params.id,
          },
        });
      const { data: contractsData }: { data: FindManyContractsOfGroupsQuery } =
        await client.query({
          query: FindManyContractsOfGroupsQueryGQL,
          variables: {
            groups: studentData.student.groups.map((group) => group.id),
          },
        });
      return {
        student: studentData.student,
        contracts: contractsData.contracts,
      };
    } catch (e) {
      redirect("/teacher/students");
    }
  },
  layout: "teacher",
  head: () => ({
    title: "Mon élève",
  }),
  components: {
    SkillsTable,
    ContractCardWithPopup,
  },
})
export default class StudentSpecificPage extends Vue {
  student?: FetchStudentQuery["student"];
  contracts: Contract[] = [];
  tab = null;

  /**
   * Exit the current student page
   */
  async exitPage() {
    await this.$router.push("/teacher/students");
  }

  async deleteStudent() {
    try {
      await this.$apollo.mutate({
        mutation: DeleteStudentGQL,
        variables: { ownerUsername: this.student?.ownerUsername },
      });
      await this.$router.push("/teacher/students");
    } catch (e) {
      alert("ERROR");
      console.error({ e });
    } finally {
    }
  }
}
</script>
