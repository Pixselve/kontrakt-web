<template>
  <v-card flat>
    <v-row justify="space-between" class="px-5" dense align="center">
      <v-col class="d-flex">
        <div class="mr-5">
          <v-chip color="primary"
            ><v-avatar left><v-icon>mdi-account-circle</v-icon></v-avatar>
            {{ student.ownerUsername }}</v-chip
          >
        </div>
        <div>
          {{ student.lastName.toUpperCase() }} {{ student.firstName }}
          <!--   Groups chip list   -->
          <v-row no-gutters align="center">
            <v-chip-group>
              <v-chip
                color="primary"
                small
                label
                v-for="group in student.groups"
                :key="group.id"
                >{{ group.name }}
              </v-chip>
            </v-chip-group>

            <GroupsSelector
              @input="editGroups"
              :groups="groups"
              v-model="selectedGroup"
            />
          </v-row>
        </div>
      </v-col>
<!--      <v-col>-->
<!--        <div-->
<!--          v-if="student.skillsToStudentToFinish.length > 0"-->
<!--          class="text-center"-->
<!--        >-->
<!--          {{ student.skillsToStudentToFinish.length }}-->
<!--          compétences à terminer-->
<!--        </div>-->
<!--        <div v-else class="text-center">À jour</div>-->
<!--        <v-progress-linear-->
<!--          :color="progressBarColor"-->
<!--          height="7"-->
<!--          rounded-->
<!--          :value="progressBarValue"-->
<!--        ></v-progress-linear>-->
<!--      </v-col>-->
      <v-col class="text-right">
        <v-btn :to="`/teacher/students/${student.id}`" icon>
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { FetchStudentsQuery } from "~/types/types";
import "reflect-metadata";
import { groupsStore, studentsStore } from "~/utils/store-accessor";
import CreateGroupDialog from "~/components/CreateGroupDialog.vue";
import GroupsSelector from "~/components/GroupsSelector.vue";

@Component<StudentListItem>({
  components: { GroupsSelector, CreateGroupDialog }
})
export default class StudentListItem extends Vue {
  @Prop() readonly highestAwaitingToFinishSkillCount!: number;
  @Prop()
  readonly student!: FetchStudentsQuery["students"][0];

  selectedGroup: number[] = this.student.groups?.map(({ id }) => id) ?? [];

  /**
   * Edit the student's groups
   */
  async editGroups() {
    try {
      await studentsStore.editStudentGroups({
        studentId: this.student.id,
        groupIds: this.selectedGroup
      });
      await studentsStore.fetchStudents();

      this.selectedGroup = this.student.groups?.map(({ id }) => id) ?? [];
    } catch (e) {
      alert("Une erreur est survenue");
      console.log({ e });
    } finally {
    }
  }

  get groups() {
    return groupsStore.groups;
  }

  get progressBarValue() {
    return this.highestAwaitingToFinishSkillCount === 0
      ? 100
      : ((this.highestAwaitingToFinishSkillCount -
          (this.student.skillsToStudentToFinish?.length ??
            this.highestAwaitingToFinishSkillCount)) *
          100) /
          this.highestAwaitingToFinishSkillCount;
  }

  get progressBarColor() {
    if (this.progressBarValue >= 75) {
      return "green";
    } else if (this.progressBarValue >= 25) {
      return "orange";
    } else {
      return "red";
    }
  }
}
</script>
