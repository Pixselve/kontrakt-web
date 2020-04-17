import Vue from 'vue';

Vue.filter('dateDayMonth', (val: string) => {
  return new Date(val).toLocaleDateString("fr-FR", { day: "numeric", month: "long" });
});
