<template>
  <v-form @submit.prevent="handleSubmit" id="todo-form">
    <v-textarea
      label="What do you need to do?"
      v-model.trim="title"
      outlined
      auto-grow
    ></v-textarea>
    <v-btn type="submit" color="primary">Add</v-btn>
  </v-form>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class TodoForm extends Vue {
  private title = "";

  handleSubmit() {
    this.$store.dispatch("asyncAddTodo", this.title).then(() => {
      this.title = "";
    });
  }
}
</script>

<style scoped>
#todo-form {
  margin: 3rem;
}
</style>
