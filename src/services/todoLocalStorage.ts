import Todo from "@/models/Todo";

const TODOS_STORAGE_KEY = "todos";

export const getTodos = (): Todo[] => {
  if (window.localStorage.getItem(TODOS_STORAGE_KEY)) {
    return JSON.parse(window.localStorage.getItem(TODOS_STORAGE_KEY) as string);
  }
  return [];
};

export const saveTodos = (todos: Todo[]): void => {
  window.localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos));
};

export const destroyTodos = (): void => {
  window.localStorage.removeItem(TODOS_STORAGE_KEY);
};

export default { getTodos, saveTodos, destroyTodos };
