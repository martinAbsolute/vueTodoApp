<template>
  <form @submit="handleSubmit">
    <input
      type="text"
      name="todo"
      placeholder="Water the plants..."
      v-model="title"
    />
    <button type="submit">Submit</button>
  </form>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import store from "../store";

@Component
export default class TodoForm extends Vue {
  title = "";

  handleSubmit(event: Event): void {
    event.preventDefault();
    store.dispatch("addTodo", { title: this.title }).then(() => {
      this.title = "";
    });
  }
}
</script>
