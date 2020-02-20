<template>
  <v-btn type="button" @click="handleFetchFakeClick">Fetch Fake</v-btn>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

@Component
export default class FakeTodoFetcher extends Vue {
  handleFetchFakeClick() {
    this.$store.dispatch("asyncFetchFakeTodos");
  }
}
</script>
