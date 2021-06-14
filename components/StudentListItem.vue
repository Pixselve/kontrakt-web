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
      <v-col>
        <div v-if="skillsToFinish.length > 0" class="text-center">
          {{ skillsToFinish.length }}
          compétences à terminer
        </div>
        <div v-else class="text-center">À jour</div>
        <v-progress-linear
          :color="progressBarColor"
          height="7"
          rounded
          :value="progressBarValue"
        ></v-progress-linear>
      </v-col>
      <v-col class="text-right">
        <v-btn :to="`/teacher/students/${student.ownerUsername}`" icon>
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { FetchStudentsQuery, FindManyGroupsQuery } from "~/types/types";
import CreateGroupDialog from "~/components/CreateGroupDialog.vue";
import GroupsSelector from "~/components/GroupsSelector.vue";
import FindManyGroupsGQL from "~/apollo/queries/groups/FindManyGroups.graphql";

@Component<StudentListItem>({
  components: { GroupsSelector, CreateGroupDialog },
  async fetch(): Promise<void> | void {
    const { data }: { data: FindManyGroupsQuery } = await this.$apollo.query({
      query: FindManyGroupsGQL,
    });
    this.groups = data.groups
  },
})
export default class StudentListItem extends Vue {
  @Prop()
  readonly student!: FetchStudentsQuery["students"][0];

  selectedGroup: number[] = this.student.groups.map(group => group.id)
  groups: FindManyGroupsQuery["groups"] = []

  /**
   * Edit the student's groups
   */
  async editGroups() {
    try {
      await studentsStore.editStudentGroups({
        studentId: this.student.ownerUsername,
        groupIds: this.selectedGroup,
      });
      await studentsStore.fetchStudents();

      this.selectedGroup = this.student.groups?.map(({ id }) => id) ?? [];
    } catch (e) {
      alert("Une erreur est survenue");
      console.log({ e });
    } finally {
    }
  }


  get skillsToFinish() {
    //TODO todo marks
    return this.student.studentSkills.filter(
      (studentSkill) => studentSkill.mark === "TODO"
    );
  }

  get progressBarValue() {
    return this.student.studentSkills.length === 0
      ? 100
      : ((this.student.studentSkills.length -
          (this.skillsToFinish.length ?? this.student.studentSkills.length)) *
          100) /
          this.student.studentSkills.length;
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
