<template>
  <ul>
    <TodoCard
      v-for="todo in todos"
      :key="todo.id"
      v-bind:id="todo.id"
      :title="todo.title"
      :completed="todo.completed"
    />
  </ul>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import TodoCard from "@/components/TodoCard.vue";
import Todo from "@/types/Todo";

@Component({
  components: {
    TodoCard
  }
})
export default class TaskContainer extends Vue {
  @Prop() private todos!: Todo[];
}
</script>

<style scoped lang="scss">
ul {
  list-style-type: none;
  padding: 0;
}
</style>
