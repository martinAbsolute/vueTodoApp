<template>
  <div class="about" v-bind:class="{ 'dark-mode': darkModeActive }">
    <h1>This is an about page</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import store from "@/store";

@Component
export default class About extends Vue {
  get darkModeActive() {
    return store.state.darkMode;
  }
}
</script>

<style scoped>
.dark-mode {
  color: white;
}
</style>
