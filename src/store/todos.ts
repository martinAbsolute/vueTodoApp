import uuid from "uuid";
import Todo from "@/types/Todo";
import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";

@Module
export default class Todos extends VuexModule {
  todos: Todo[] = JSON.parse(localStorage.getItem("todos") || "[]");
  get todoCount() {
    return this.todos.length;
  }
  @Mutation
  submitAllTodos() {
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }

  @Mutation
  addTodo(title: string) {
    const newTodo = {
      id: uuid.v4(),
      title,
      completed: false
    };
    this.todos = [...this.todos, newTodo];
  }

  @Mutation
  deleteTodo({ id }: { id: string }) {
    this.todos = this.todos.filter((todo: Todo) => todo.id !== id);
  }

  @Mutation
  editTodo({ id, title }: { id: string; title: string }) {
    const todoIndex = this.todos.findIndex((todo: Todo) => todo.id === id);
    if (todoIndex !== undefined) {
      this.todos[todoIndex].title = title;
      this.todos[todoIndex].completed = false;
    }
  }

  @Mutation
  toggleTodoCompleted({ id }: { id: string }) {
    const todoIndex = this.todos.findIndex((todo: Todo) => todo.id === id);
    if (todoIndex !== undefined) {
      this.todos[todoIndex].completed = !this.todos[todoIndex].completed;
    }
  }

  @Mutation
  swapTodos({ firstId, secondId }: { firstId: string; secondId: string }) {
    const todos = [...this.todos];
    const firstIndex = todos.findIndex((todo: Todo) => todo.id === firstId);
    const secondIndex = todos.findIndex((todo: Todo) => todo.id === secondId);
    if (firstIndex !== undefined && secondIndex !== undefined) {
      const temp = todos[firstIndex];
      todos[firstIndex] = todos[secondIndex];
      todos[secondIndex] = temp;
      this.todos = todos;
    }
  }

  @Action
  asyncAddTodo(title: string) {
    this.context.commit("addTodo", title);
    this.context.commit("submitAllTodos");
  }

  @Action
  asyncDeleteTodo(id: string) {
    this.context.commit("deleteTodo", id);
    this.context.commit("submitAllTodos");
  }
  @Action
  asyncEditTodo({ id, title }: { id: string; title: string }) {
    this.context.commit("editTodo", { id, title });
    this.context.commit("submitAllTodos");
  }
  @Action
  asyncSwapTodos({ firstId, secondId }: { firstId: string; secondId: string }) {
    this.context.commit("swapTodos", { firstId, secondId });
    this.context.commit("submitAllTodos");
  }
  @Action
  asyncToggleTodoCompleted(id: string) {
    this.context.commit("toggleTodoCompleted", id);
    this.context.commit("submitAllTodos");
  }
  @Action
  async asyncFetchFakeTodos() {
    await fetch("https://reqres.in/api/users?page=2")
      .then(res => res.json())
      .then(users => {
        users.data.forEach((user: Record<string, string>) => {
          this.context.commit("addTodo", user.email);
        });
      });
    this.context.commit("submitAllTodos");
  }
}
