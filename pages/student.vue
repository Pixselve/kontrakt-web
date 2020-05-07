<template>
  <v-container>
    <v-row>
      <v-col class="text-right" cols="12">
        <v-btn icon @click="toggleTheme">
          <v-icon v-text="isDarkTheme ? 'mdi-moon-waxing-crescent' : 'mdi-white-balance-sunny'">
          </v-icon>
        </v-btn>
        <v-btn @click="disconnect" icon>
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <!--    <v-row v-if="todayContract">-->
    <!--      <v-col cols="12">-->
    <!--        <h1>Le contrat du {{todayContractDate}}</h1>-->
    <!--      </v-col>-->
    <!--      <v-col cols="12">-->
    <!--        <v-card>-->
    <!--          <v-card-text>-->
    <!--            <SkillsTable :skills="todayContract.skills"/>-->
    <!--          </v-card-text>-->
    <!--        </v-card>-->
    <!--      </v-col>-->
    <!--    </v-row>-->
    <!--    <v-row v-else>-->
    <!--      <v-col cols="12">-->
    <!--        <h1>Il n'y a pas de contrat aujourd'hui</h1>-->
    <!--      </v-col>-->
    <!--    </v-row>-->


    <v-row v-if="skillsCountNeededToBeFinished > 0">
      <v-col cols="12">
        <h1>Les compétences à terminer
          <v-badge :content="skillsCountNeededToBeFinished"></v-badge>
        </h1>
      </v-col>
      <v-col v-for="contract in contractsNeededToBeFinished" :key="contract.id" cols="12" xs="12" sm="12" md="6"
             lg="4"
             xl="4">
        <awaiting-finish-contract-card :contract="contract"></awaiting-finish-contract-card>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12">
        <h1>Vous n'avez plus rien à faire 😁</h1>
      </v-col>
    </v-row>


    <v-row>
      <v-col>
        <h1>Les contrats</h1>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row>

      <v-col cols="12" sm="12" md="6" lg="4" xl="3" v-for="contract in contracts" :key="contract.id">
        <contract-card-with-popup :editable="false" :contract="contract"></contract-card-with-popup>
      </v-col>

    </v-row>
  </v-container>


</template>

<script lang="ts">
  import { Component, Vue }               from 'vue-property-decorator';
  import ContactPopup                     from "~/components/ContractPopup.vue";
  import SkillsTable                      from "~/components/SkillsTable.vue";
  import ContractCard                     from "~/components/ContractCard.vue";
  import { contractsStore, studentStore } from "~/utils/store-accessor";
  import ContractCardWithPopup            from "~/components/ContractCardWithPopup.vue";
  import AwaitingFinishContractCard       from "~/components/AwaitingFinishContractCard.vue";

  @Component({
    components: {
      SkillsTable,
      ContactPopup,
      ContractCard,
      ContractCardWithPopup,
      AwaitingFinishContractCard
    },
    head: () => ({
      title: "Élève"
    }),
    async asyncData() {
      await contractsStore.fetchContracts();
      if (studentStore.studentId)
        await studentStore.fetchAwaitingToFinishContracts(studentStore.studentId);
    },
    fetchOnServer: true,
    fetchDelay: 300,
    middleware: "studentLogged"
  })
  export default class StudentPage extends Vue {

    get isDarkTheme() {
      return this.$vuetify.theme.dark;
    }

    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    }


    async disconnect() {
      await this.$router.push("/login");
      studentStore.logout();
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

    get contractsNeededToBeFinished() {
      return studentStore.getContractsNeededToBeFinished;
    };


    get skillsCountNeededToBeFinished() {
      return studentStore.skillsCountNeededToBeFinished;
    }

    get todayContract() {
      return contractsStore.todayContract;
    }

    get laterContracts() {
      return contractsStore.laterContracts;
    }

    get contracts() {
      return contractsStore.getContracts;
    }

    get student() {
      return studentStore.student;
    }
  }
</script>
