<template>
  <v-dialog v-model="dialog" max-width="500" persistent>
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
        <div v-if="!complete">
          <v-card-text>
            <v-text-field v-model="studentData.firstName" label="Prénom" outlined required></v-text-field>
            <v-text-field v-model="studentData.lastName" label="Nom de famille" outlined required></v-text-field>
            <v-text-field v-model="studentData.password" label="Mot de passe" outlined required></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="close">Annuler</v-btn>
            <v-btn color="primary" type="submit">Ajouter</v-btn>
          </v-card-actions>
        </div>
        <div v-else-if="addedStudent !== null">
          <v-card-text>
            <v-alert type="success">
              Élève ajouté !
              <v-divider></v-divider>
              Identifiant : {{ addedStudent.ownerUsername }}
            </v-alert>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="close">Fermer</v-btn>
          </v-card-actions>

        </div>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Ref, Vue } from 'vue-property-decorator';
import CreateOneStudentGQL from "~/apollo/mutations/student/CreateOneStudent.graphql";
import { CreateOneStudentMutation, FetchStudentsQuery } from "~/types/types";
import FetchStudentsQueryGQL from "~/apollo/queries/FetchStudents.graphql";

@Component({})
export default class CreateStudentDialog extends Vue {

  @Ref("form") readonly formRef!: HTMLFormElement;
  dialog = false;
  loading = false;
  complete = false;
  addedStudent: CreateOneStudentMutation["createOneStudent"] | null = null;


  studentData = {
    firstName: "",
    lastName: "",
    password: ""
  };

  close() {
    this.dialog = false;
    this.formRef.reset();
    this.studentData = {
      firstName: "",
      lastName: "",
      password: ""
    };
    this.addedStudent = null;
    this.complete = false;
  }

  async submit() {
    try {
      this.loading = true;
      const { data: addedStudent } = await this.$apollo.mutate({
        mutation: CreateOneStudentGQL,
        variables: this.studentData,
        update: (store, { data: { createOneStudent } }) => {
          const data: FetchStudentsQuery | null = store.readQuery({
            query: FetchStudentsQueryGQL,
          });
          if (data !== null) {
            data.students.push(createOneStudent);
            store.writeQuery({ query: FetchStudentsQueryGQL, data });
          }
        }
      });
      this.addedStudent = addedStudent.createOneStudent;
      this.complete = true;
      this.loading = false;
    } catch (e) {

    }
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
