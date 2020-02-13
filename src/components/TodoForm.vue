<template>
  <form @submit="handleSubmit">
    <input
      type="text"
      name="todo-title"
      placeholder="Water the plants..."
      v-model.trim="title"
    />
    <button type="submit">Add</button>
  </form>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import store from "@/store";

@Component
export default class TodoForm extends Vue {
  private title = "";

  handleSubmit(event: Event): void {
    event.preventDefault();
    store.dispatch("addTodo", { title: this.title }).then(() => {
      this.title = "";
    });
  }
}
</script>
