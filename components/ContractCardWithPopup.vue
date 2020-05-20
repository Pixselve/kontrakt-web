<template>
  <div>
    <contract-popup :editable="editable" :contract="contract" ref="popup"></contract-popup>
    <contract-card @click="cardClick" :dateString="contract.date">
      <v-row no-gutters align-content="center" justify="center">
        <v-col cols="12">
          <v-icon small>mdi-marker</v-icon>
          Consulter le contrat
        </v-col>
      </v-row>
    </contract-card>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Ref, Vue } from 'vue-property-decorator';
  import { Contract } from "~/types/types";
  import ContractCard from "~/components/ContractCard.vue";
  import ContractPopup from "~/components/ContractPopup.vue";
  import { studentStore } from "~/utils/store-accessor";

  @Component({
    components: {
      ContractPopup,
      ContractCard
    }
  })
  export default class ContractCardWithPopup extends Vue {
    @Ref("popup") readonly popupRef!: ContractPopup;
    @Prop({ type: Object }) readonly contract!: Contract;
    @Prop({ type: Boolean, default: () => false }) readonly editable!: boolean;


    popup = false;

    get studentSkills() {
      return studentStore.skillToStudents;
    }


    get skillsToContract() {
      return this.contract.skills;
    }

    get studentSkillsOfContract() {
      if (this.studentSkills) {
        this.studentSkills.find(studentSkill => studentSkill.skill);
      } else {
        return [];
      }

    }

    cardClick() {
      this.popupRef.dialog = true;
    }
  }
</script>
