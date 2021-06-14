<template>
  <div>
    <v-app-bar flat>
      <v-btn @click="exitPage" icon>
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title
        >{{ student.firstName }} {{ student.lastName }}
      </v-toolbar-title>
      <template v-slot:extension>
        <v-tabs centered grow v-model="tab">
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
          <v-row>
            <v-col
              cols="12"
              sm="12"
              md="6"
              lg="4"
              xl="3"
              v-for="contract in contracts"
              :key="contract.id"
            >
              <contract-card-with-popup
                :editable="true"
                :contract="contract"
                :student-username="student.ownerUsername"
              ></contract-card-with-popup>

            </v-col>
          </v-row>
        </v-container>
      </v-tab-item>
      <v-tab-item>
        <v-container>
          <v-btn @click="deleteStudent" color="red" block
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
import {
  Contract,
  FetchStudentQuery,
  FindManyContractsOfGroupsQuery, Student,
} from "~/types/types";

import FetchStudentQueryGQL from "~/apollo/queries/FetchStudent.graphql";
import FindManyContractsOfGroupsQueryGQL from "~/apollo/queries/contact/FindManyContractsOfGroups.graphql";

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
      return { student: studentData.student, contracts: contractsData.contracts };
    } catch (e) {
      redirect("/teacher/students");
    }
  },
  // async asyncData({ params }) {
  //   studentStore.logout();
  //   await studentStore.fetchStudent(parseInt(params.id));
  //   await Promise.all([
  //     contractsStore.fetchContractsOfGroups(studentStore.student?.groups.map(group => group.id) ?? [])
  //   ]);
  // },
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
  student?: Student;
  contracts: Contract[] = [];

  /**
   * Exit the current student page
   */
  async exitPage() {
    await this.$router.push("/teacher/students");
  }

  async deleteStudent() {
    try {
      await this.$router.push("/teacher/students");
    } catch (e) {
      alert("ERROR");
      console.error({ e });
    } finally {
    }
  }

  tab = null;
}
</script>
