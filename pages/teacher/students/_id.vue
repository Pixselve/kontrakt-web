<template>
  <div>
    <v-app-bar flat>

      <v-btn @click="exitPage" icon>
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>{{student.firstName}} {{student.lastName}}</v-toolbar-title>
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
          <!--          <v-row>-->
          <!--            <v-col cols="12" v-if="todayContract">-->
          <!--              <h1>Le contrat du {{todayContractDate}}</h1>-->
          <!--              <skills-table editable :skills="todayContract.skills"></skills-table>-->
          <!--            </v-col>-->
          <!--            <v-col v-else>-->
          <!--              <h1>Pas de contrat aujourd'hui</h1>-->
          <!--            </v-col>-->
          <!--          </v-row>-->

          <h1>Les contrats</h1>
          <v-divider></v-divider>
          <v-row>
            <v-col cols="12" sm="12" md="6" lg="4" xl="3" v-for="contract in contracts" :key="contract.id">
              <contract-card-with-popup :editable="true" :contract="contract"></contract-card-with-popup>
            </v-col>
          </v-row>

        </v-container>
      </v-tab-item>
      <v-tab-item>
        <v-container>
          <v-btn @click="deleteStudent" color="red" block>Supprimer l'élève</v-btn>
        </v-container>
      </v-tab-item>
    </v-tabs-items>

  </div>
</template>

<script lang="ts">
  import { Component, Vue }                        from 'vue-property-decorator';
  import { $apollo }                               from "~/utils/getGraphQLClient";
  import CheckIfStudentExistsMutationGQL           from "~/apollo/mutations/CheckIfStudentExists.graphql";
  import { CheckIfStudentExistsMutationVariables } from "~/types/types";
  import SkillsTable                               from "~/components/SkillsTable.vue";
  import { contractsStore, studentStore }          from "~/utils/store-accessor";
  import ContractCardWithPopup                     from "~/components/ContractCardWithPopup.vue";

  @Component({
    async validate({ params }): Promise<boolean> {
      const { data } = await $apollo.mutate({
        mutation: CheckIfStudentExistsMutationGQL,
        variables: {
          id: parseInt(params.id)
        } as CheckIfStudentExistsMutationVariables
      });
      return data.checkIsStudentExists;
    },
    async asyncData({ params }) {
      studentStore.logout();
      await Promise.all([studentStore.fetchStudent(parseInt(params.id)), contractsStore.fetchContracts()]);
    },
    layout: "teacher",
    head: () => ({
      title: "Mon élève"
    }),
    components: {
      SkillsTable,
      ContractCardWithPopup
    }
  })
  export default class StudentSpecificPage extends Vue {


    student = studentStore.student;


    get contracts() {
      return contractsStore.getContracts;
    }

    get todayContract() {
      return contractsStore.todayContract;
    }

    get laterContracts() {
      return contractsStore.laterContracts;
    }

    get todayContractDate() {
      if (contractsStore.todayContract) {
        return new Date(contractsStore.todayContract.date).toLocaleDateString("fr-FR", {
          day: "numeric",
          month: "long"
        });
      } else {
        return "";
      }
    }

    /**
     * Exit the current student page
     */
    async exitPage() {
      await this.$router.push("/teacher/students");
    }

    async deleteStudent() {
      try {
        await studentStore.deleteStudent();
        await this.$router.push("/teacher/students");
      } catch ( e ) {
        alert("ERROR");
        console.error({ e });
      } finally {

      }
    }

    tab = null;
  }
</script>
