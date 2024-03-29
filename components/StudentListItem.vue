<template>
  <v-card flat>
    <v-row align="center" class="px-5" dense justify="space-between">
      <v-col class="d-flex">
        <div class="mr-5">
          <v-chip color="primary">
            <v-avatar left>
              <v-icon>mdi-account-circle</v-icon>
            </v-avatar>
            {{ student.ownerUsername }}
          </v-chip>
        </div>
        <div>
          {{ student.lastName.toUpperCase() }} {{ student.firstName }}
          <!--   Groups chip list   -->
          <v-row align="center" no-gutters>
            <v-chip-group>
              <v-chip
                v-for="group in student.groups"
                :key="group.id"
                color="primary"
                label
                small
              >{{ group.name }}
              </v-chip>
            </v-chip-group>

            <GroupsSelector
              v-model="selectedGroup"
              :groups="groups"
              @input="editGroups"
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
          :value="progressBarValue"
          height="7"
          rounded
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
import UpdateStudentGroupsGQL from "~/apollo/mutations/student/UpdateStudentGroups.graphql";
import FetchStudentsQueryGQL from "~/apollo/queries/FetchStudents.graphql";

@Component<StudentListItem>({
  components: { GroupsSelector, CreateGroupDialog },
  apollo: {
    groups: {
      query: FindManyGroupsGQL,
    },
  },
})
export default class StudentListItem extends Vue {
  @Prop()
  readonly student!: FetchStudentsQuery["students"][0];

  selectedGroup: number[] = this.student.groups.map((group) => group.id);
  groups: FindManyGroupsQuery["groups"] = [];

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

  /**
   * Edit the student's groups
   */
  async editGroups() {
    await this.$apollo.mutate({
      mutation: UpdateStudentGroupsGQL,
      variables: {
        ownerUsername: this.student.ownerUsername,
        groups: this.selectedGroup,
      },
      update: (store, { data: { updateOneStudent } }) => {
        // Read the data from our cache for this query.
        const data: FetchStudentsQuery | null = store.readQuery({
          query: FetchStudentsQueryGQL,
        });
        if (data !== null) {
          const studentIndex = data.students.findIndex(
            (student) => student.ownerUsername === this.student.ownerUsername
          );
          if (studentIndex >= 0) {
            data.students[studentIndex].groups = updateOneStudent.groups;
            data.students[studentIndex].studentSkills = updateOneStudent.studentSkills;
            store.writeQuery({ query: FetchStudentsQueryGQL, data });
          }
        }
      },
    });
  }
}
</script>
