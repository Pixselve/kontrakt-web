<template>
  <v-dialog v-model="dialog" persistent max-width="500">
    <template v-slot:activator="{ on }">
      <slot v-bind="{ on }">
        <v-btn color="primary" v-on="on">Importer un CSV</v-btn>
      </slot>
    </template>
    <v-card :loading="loading">
      <v-form ref="form" @submit.prevent="submit">
        <v-card-title>
          Importer des élèves
        </v-card-title>
        <v-card-text>
          <p>
            <span class="font-weight-black">Instructions :</span> Dans un
            fichier CSV, la première colonne correspond aux noms de familles et
            la deuxième correspond aux prénoms. La première ligne et autres
            colonnes sont ignorées.
            <a
              download="Exemple.csv"
              href="data:csv;base64,Tm9tIGRlIGZhbWlsbGUsIFByZW5vbQpEb2UsIEpvaG4="
            >Télécharger le fichier exemple</a
            >
          </p>
          <v-file-input
            required
            :rules="rules"
            v-model="file"
            label="Fichier"
            show-size
            single-line
            outlined
            accept=".csv"
            :error-messages="errors"
          ></v-file-input>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialog = false" text color="red">Annuler</v-btn>
          <v-btn type="submit" text color="secondary">Importer</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Ref, Vue } from "vue-property-decorator";
import { studentsStore } from "~/utils/store-accessor";

@Component({})
export default class ImportStudentWithCSVDialog extends Vue {
  @Ref("form") readonly formRef!: HTMLFormElement;
  dialog = false;
  loading = false;
  file: File | null = null;

  rules = [
    (v: File | null) => (!!v?.name) || "Veuillez ajouter un fichier"
  ];

  errors: string[] = []

  async submit() {
    try {
      this.loading = true;
      this.errors = []
      if (this.formRef.validate() && this.file !== null) {
        await studentsStore.importStudentsWithCSV(this.file);
        this.dialog = false;
      }
    } catch (e) {
      console.log({ e });
      if (e?.graphQLErrors[0]?.message === "NotCSV") {
        this.errors.push("Le fichier n'est pas un CSV")
      } else {
        alert("Une erreur est survenue")
      }
    } finally {
      this.loading = false;
    }
  }
}
</script>
