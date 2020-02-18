<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" height="100px" />
    <TodoForm />
    <TodoContainer :todos="todos" />
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import TodoContainer from "@/components/TodoContainer.vue";
import TodoForm from "@/components/TodoForm.vue";

@Component({
  components: {
    TodoContainer,
    TodoForm
  }
})
export default class Home extends Vue {
  get todos() {
    return this.$store.state.Todos.todos;
  }
}
</script>
