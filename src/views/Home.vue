<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <TodoContainer />
    <TodoForm />
  </div>
</template>

<script>
import TodoContainer from "@/components/TodoContainer.vue";
import TodoForm from "@/components/TodoForm.vue";

export default {
  name: "Home",
  components: {
    TodoContainer,
    TodoForm
  }
};
</script>
