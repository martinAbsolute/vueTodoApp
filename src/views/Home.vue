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
import store from "@/store";

@Component({
  components: {
    TodoContainer,
    TodoForm
  }
})
export default class Home extends Vue {
  get todos() {
    return store.state.todos;
  }
}
</script>
