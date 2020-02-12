<template>
  <div>
    <ul v-for="todo in todos" :key="todo.id">
      <TodoCard
        v-bind:id="todo.id"
        :title="todo.title"
        :completed="todo.completed"
      />
    </ul>
  </div>
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
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
