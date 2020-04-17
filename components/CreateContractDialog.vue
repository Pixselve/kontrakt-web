<template>
  <v-dialog

    fullscreen
    hide-overlay
    v-model="dialog"
  >
    <template v-slot:activator="{ on }">
      <v-btn
        color="primary"
        dark
        v-on="on"
      >
        Ajouter un contrat
      </v-btn>
    </template>

    <v-card :disabled="loading" :loading="loading" tile>
      <v-toolbar flat>
        <v-btn @click="close" icon>
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Ajouter un contrat</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn text @click="addContract">Ajouter</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text class="mt-4">

        <v-menu
          v-model="dateMenu"
          :close-on-content-click="false"
          max-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              :value="computedDateFormatted"
              label="Date"
              readonly
              prepend-icon="mdi-calendar"
              @click:clear="date = null"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker first-day-of-week="1" locale="fr-FR" v-model="date" @change="dateMenu = false"></v-date-picker>
        </v-menu>

        <v-simple-table>
          <template v-slot:default>
            <thead>
            <tr>
              <th class="text-left">Compétence</th>
              <th class="text-left">Action</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(skill, i) in skills" :key="`skillKEY${i}`">
              <td>{{skill}}</td>
              <td>
                <v-btn @click="deleteSkill(i)" icon x-small>
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
                <EditSkillDialog @edit="editSkill" :index="i" :skill-prop="skill"/>
              </td>
            </tr>
            </tbody>
          </template>
        </v-simple-table>
        <create-skill-dialog @submit="addSkill"></create-skill-dialog>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';
  import EditSkillDialog    from "~/components/EditSkillDialog.vue";
  import CreateSkillDialog  from "~/components/CreateSkillDialog.vue";
  import { contractsStore } from "~/utils/store-accessor";
  //TODO - Page title
  @Component({
    components: { EditSkillDialog, CreateSkillDialog }
  })
  export default class CreateContractDialog extends Vue {
    date = new Date().toISOString().substr(0, 10);
    dateMenu = false;
    dialog = false;
    skills: string[] = [];
    loading = false;


    deleteSkill(index: number) {
      this.skills = this.skills.filter((_, i) => i != index);
    }

    editSkill(data: { index: number, skill: string }) {

      if (data.index >= 0 && data.index < this.skills.length) {
        this.skills = this.skills.map((el, i) => i == data.index ? data.skill : el);
      }
    }

    addSkill(skill: string) {
      this.skills = [...this.skills, skill];
    }


    close() {
      this.skills = [];
      this.dialog = false;
    }

    async addContract() {
      try {
        this.loading = true;
        await contractsStore.addContract({ date: this.date, skills: this.skills });
        this.close();
      } catch ( e ) {
        alert("ERROR");
        console.error({ e });
      } finally {
        this.loading = false;
      }
    }

    get computedDateFormatted() {
      return this.date ? new Date(this.date).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: 'long',
        year: "numeric"
      }) : '';
    }


  }
</script>
