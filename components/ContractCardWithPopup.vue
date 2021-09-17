<template>
  <div>
    <v-dialog v-model="dialog" max-width="500">
      <template v-slot:activator="{ on }">
        <slot v-bind:on="on"></slot>
      </template>
      <contract-popup :contract="contract" :student-username="studentUsername" @close="dialog = false"></contract-popup>
    </v-dialog>
    <contract-card :date-string="contract.start" @click="cardClick">
      <v-row align-content="center" justify="center" no-gutters>
        <v-col cols="12">
          <v-icon small>mdi-marker</v-icon>
          Consulter le contrat
        </v-col>
      </v-row>
    </contract-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Contract } from "~/types/types";
import ContractCard from "~/components/ContractCard.vue";
import SkillsTable from "~/components/SkillsTable.vue";
import ContractPopup from "~/components/ContractPopup.vue";

@Component<ContractCardWithPopup>({
  components: {
    ContractPopup,
    ContractCard,
    SkillsTable,
  },

})
export default class ContractCardWithPopup extends Vue {
  @Prop({ type: Object }) readonly contract!: Contract;
  @Prop({ type: Boolean, default: () => false }) readonly editable!: boolean;
  @Prop() readonly studentUsername!: string;
  dialog = false;

  cardClick() {
    this.dialog = true;
  }
}
</script>
