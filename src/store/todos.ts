import uuid from "uuid";
import Todo from "@/models/Todo";
import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import todoLocalStorageService from "@/services/todoLocalStorage";
import fakeApiService from "@/services/fakeApi";
import {
  ADD_TODO,
  DELETE_TODO,
  EDIT_TODO,
  TOGGLE_TODO,
  SWAP_TODOS
} from "@/store/types/mutations";
import { FETCH_TODOS } from "@/store/types/actions";

@Module
export default class Todos extends VuexModule {
  todos: Todo[] = todoLocalStorageService.getTodos();

  get todoCount() {
    return this.todos.length;
  }

  @Mutation
  [ADD_TODO](title: string) {
    const newTodo = {
      id: uuid.v4(),
      title,
      completed: false
    };
    this.todos = [...this.todos, newTodo];
    todoLocalStorageService.saveTodos(this.todos);
  }

  @Mutation
  [DELETE_TODO]({ id }: { id: string }) {
    this.todos = this.todos.filter((todo: Todo) => todo.id !== id);
    todoLocalStorageService.saveTodos(this.todos);
  }

  @Mutation
  [EDIT_TODO]({ id, title }: { id: string; title: string }) {
    const todoIndex = this.todos.findIndex((todo: Todo) => todo.id === id);
    this.todos[todoIndex].title = title;
    this.todos[todoIndex].completed = false;
    todoLocalStorageService.saveTodos(this.todos);
  }

  @Mutation
  [TOGGLE_TODO]({ id }: { id: string }) {
    const todoIndex = this.todos.findIndex((todo: Todo) => todo.id === id);
    this.todos[todoIndex].completed = !this.todos[todoIndex].completed;
    todoLocalStorageService.saveTodos(this.todos);
  }

  @Mutation
  [SWAP_TODOS]({ firstId, secondId }: { firstId: string; secondId: string }) {
    const todos = [...this.todos];
    const firstIndex = todos.findIndex((todo: Todo) => todo.id === firstId);
    const secondIndex = todos.findIndex((todo: Todo) => todo.id === secondId);
    const temp = todos[firstIndex];
    todos[firstIndex] = todos[secondIndex];
    todos[secondIndex] = temp;
    this.todos = todos;
  }

  @Action
  async [FETCH_TODOS]() {
    await fakeApiService
      .get("users?page=2")
      .then(response => response.data)
      .then(users => {
        users.data.forEach((user: Record<string, string>) => {
          this.context.commit(ADD_TODO, user.email);
        });
      });
    todoLocalStorageService.saveTodos(this.todos);
  }
}
