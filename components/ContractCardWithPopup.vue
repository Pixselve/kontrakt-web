<template>
  <div>

    <v-dialog v-model="dialog" max-width="500">
      <template v-slot:activator="{ on }">
        <slot v-bind:on="on"></slot>
      </template>
      <contract-popup @close="dialog = false" :student-username="studentUsername" :contract="contract"></contract-popup>
    </v-dialog>
    <contract-card @click="cardClick" :date-string="contract.start">
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
import { Component, Prop, Ref, Vue } from "vue-property-decorator";
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
    this.dialog = true
  }
}
</script>
