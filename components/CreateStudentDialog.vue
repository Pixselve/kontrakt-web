<template>
  <v-dialog v-model="dialog" persistent max-width="500">
    <template v-slot:activator="{on}">
      <slot v-bind="{on}">
        <v-btn color="primary" v-on="on">Ajouter un élève</v-btn>
      </slot>

    </template>
    <v-card :loading="loading">
      <v-form ref="form" @submit.prevent="submit">
        <v-card-title>
          Ajouter un élève
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="studentData.firstName" outlined required placeholder="Prénom"></v-text-field>
          <v-text-field v-model="studentData.lastName" outlined required placeholder="Nom de famille"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="close" color="primary" text>Annuler</v-btn>
          <v-btn type="submit" color="primary">Ajouter</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
  import { Component, Ref, Vue } from 'vue-property-decorator';

  @Component({})
  export default class CreateStudentDialog extends Vue {

    @Ref("form") readonly formRef!: HTMLFormElement;
    dialog = false;
    loading = false;


    studentData = {
      firstName: "",
      lastName: ""
    };

    close() {
      this.dialog = false;
      this.formRef.reset();
    }

    async submit() {
      // TODO
      // this.loading = true;
      // try {
      //   await studentsStore.addStudent(this.studentData);
      //   this.close();
      // } catch (e) {
      //   console.error(e);
      // } finally {
      //   this.loading = false;
      // }
    }
  }
</script>
