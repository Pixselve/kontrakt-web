<template>
  <h1>ergerg</h1>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';

  @Component({
    //@ts-ignore
    async validate({redirect}) {
      redirect("/login")
    }
  })
  export default class IndexPage extends Vue {

  }
</script>
