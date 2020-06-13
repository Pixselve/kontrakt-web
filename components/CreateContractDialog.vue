<template>
  <v-dialog fullscreen hide-overlay v-model="dialog">
    <template v-slot:activator="{ on }">
      <slot v-bind="{ on }">
        <v-btn color="primary" dark v-on="on">
          Ajouter un contrat
        </v-btn>
      </slot>
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
      <v-card-text>
        <v-row align="center">
          <v-col>
            <v-text-field v-model="name" outlined required label="Nom du contrat"></v-text-field>
            <v-menu
              v-model="dates.start.isMenuOpen"
              :close-on-content-click="false"
              max-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  :value="dates.start.computedDateFormatted"
                  label="Date de début"
                  readonly
                  prepend-icon="mdi-calendar"
                  @click:clear="dates.start.value = null"
                  v-on="on"
                  outlined
                  required
                ></v-text-field>
              </template>
              <v-date-picker
                first-day-of-week="1"
                locale="fr-FR"
                v-model="dates.start.value"
                @change="dates.start.isMenuOpen = false"
              ></v-date-picker>
            </v-menu>

            <v-menu
              v-model="dates.end.isMenuOpen"
              :close-on-content-click="false"
              max-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  :value="dates.end.computedDateFormatted"
                  label="Date de fin"
                  readonly
                  prepend-icon="mdi-calendar"
                  @click:clear="dates.end.value = null"
                  v-on="on"
                  outlined
                  required
                ></v-text-field>
              </template>
              <v-date-picker
                first-day-of-week="1"
                locale="fr-FR"
                v-model="dates.end.value"
                @change="dates.end.isMenuOpen = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col>
            <v-color-picker v-model="color" hide-mode-switch mode="hexa" hide-canvas></v-color-picker>
          </v-col>
        </v-row>





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
              <td>{{ skill }}</td>
              <td>
                <v-btn @click="deleteSkill(i)" icon x-small>
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
                <EditSkillDialog
                  @edit="editSkill"
                  :index="i"
                  :skill-prop="skill"
                />
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
import { Component, Vue } from "vue-property-decorator";
import EditSkillDialog from "~/components/EditSkillDialog.vue";
import CreateSkillDialog from "~/components/CreateSkillDialog.vue";
import { contractsStore } from "~/utils/store-accessor";

@Component({
  components: { EditSkillDialog, CreateSkillDialog }
})
export default class CreateContractDialog extends Vue {
  dialog = false;
  skills: string[] = [];
  loading = false;

  dates = {
    start: {
      value: new Date().toISOString().substr(0, 10),
      isMenuOpen: false,
      get computedDateFormatted() {
        return this.value
          ? new Date(this.value).toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "long",
            year: "numeric"
          })
          : "";
      }
    },
    end: {
      value: new Date().toISOString().substr(0, 10),
      isMenuOpen: false,
      get computedDateFormatted() {
        return this.value
          ? new Date(this.value).toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "long",
            year: "numeric"
          })
          : "";
      }
    }
  };

  name = "";
  color = ""

  deleteSkill(index: number) {
    this.skills = this.skills.filter((_, i) => i != index);
  }

  editSkill(data: { index: number; skill: string }) {
    if (data.index >= 0 && data.index < this.skills.length) {
      this.skills = this.skills.map((el, i) =>
        i == data.index ? data.skill : el
      );
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
      await contractsStore.addContract({
        start: this.dates.start.value,
        end: this.dates.end.value,
        skills: this.skills,
        name: this.name,
        rgb: this.color
      });
      this.close();
    } catch (e) {
      alert("ERROR");
      console.error({ e });
    } finally {
      this.loading = false;
    }
  }
}
</script>
