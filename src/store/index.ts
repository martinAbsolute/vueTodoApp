import Vue from "vue";
import Vuex from "vuex";
import uuid from "uuid";
import Todo from "../types/Todo";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    darkMode: false,
    todos: JSON.parse(localStorage.getItem("todos") || "[]")
  },
  mutations: {
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
    },

    submitAllTodos(state) {
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },

    addTodo(state, { title }) {
      const newTodo = {
        id: uuid.v4(),
        title,
        completed: false
      };
      state.todos = [...state.todos, newTodo];
    },

    deleteTodo(state, { id }) {
      state.todos = state.todos.filter((todo: Todo) => todo.id !== id);
    },

    editTodo(state, { id, title }) {
      const todoIndex = state.todos.findIndex((todo: Todo) => todo.id === id);
      if (todoIndex !== undefined) {
        state.todos[todoIndex].title = title;
        state.todos[todoIndex].completed = false;
      }
    },

    toggleTodoCompleted(state, { id }) {
      const todoIndex = state.todos.findIndex((todo: Todo) => todo.id === id);
      if (todoIndex !== undefined) {
        state.todos[todoIndex].completed = !state.todos[todoIndex].completed;
      }
    }
  },
  actions: {
    addTodo({ commit }, payload) {
      commit("addTodo", payload);
      commit("submitAllTodos");
    },
    deleteTodo({ commit }, payload) {
      commit("deleteTodo", payload);
      commit("submitAllTodos");
    },
    editTodo({ commit }, payload) {
      commit("editTodo", payload);
      commit("submitAllTodos");
    },
    toggleTodoCompleted({ commit }, payload) {
      commit("toggleTodoCompleted", payload);
      commit("submitAllTodos");
    }
  },
  modules: {}
});
