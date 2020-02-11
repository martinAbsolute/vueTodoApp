<template>
  <div
    v-bind:class="{ 'dark-mode': darkModeActive }"
    class="card"
    @click="handleToggleComplete"
  >
    <li v-bind:class="{ completed }">
      <span>{{ title }}</span>
    </li>
    <button @click="handleDelete" type="button">X</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "../store";

@Component
export default class TaskCard extends Vue {
  @Prop() private id!: number;
  @Prop() private title!: string;
  @Prop() private completed!: boolean;
  get darkModeActive() {
    return store.state.darkMode;
  }

  handleDelete() {
    store.dispatch("deleteTodo", { id: this.id });
  }

  handleToggleComplete() {
    store.dispatch("toggleTodoCompleted", { id: this.id });
  }
}
</script>

<style scoped lang="scss">
.card {
  font-size: 1.5rem;
  list-style: none;
  background-color: pink;
  display: block;
  & :hover {
    background-color: rgb(255, 68, 99);
  }
}
button {
  font-size: 1rem;
  background-color: red;
  border: none;
  width: 100%;
  color: white;
}
.dark-mode {
  color: white;
}
.completed {
  text-decoration: line-through;
}
</style>
