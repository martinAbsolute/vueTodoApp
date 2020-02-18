<template>
  <div
    class="card"
    draggable="true"
    :class="{ completed }"
    @dragstart="dragStart"
    @drop="drop"
    @dragover="allowDrop"
  >
    <li>
      <input
        v-if="!unsaved"
        :checked="completed"
        type="checkbox"
        class="todo-checkbox"
        @click="handleToggleComplete"
      />
      <img
        v-else
        alt="loader"
        src="../assets/loader.svg"
        height="30"
        width="30"
      />
      <textarea
        type="text"
        v-model.trim="editableTitle"
        :disabled="completed"
      />
    </li>
    <button @click="handleDelete" type="button" class="delete-button">X</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import _ from "lodash";

@Component
export default class TaskCard extends Vue {
  @Prop() private id!: string;
  @Prop() private title!: string;
  @Prop() private completed!: boolean;

  private editableTitle = this.title;
  private unsaved = false;

  private debouncedHandleEdit = _.debounce(() => {
    this.handleEdit();
  }, 500);

  @Watch("editableTitle")
  onTitleChange(newTitle: string, oldTitle: string) {
    if (newTitle !== oldTitle && newTitle !== "") {
      this.unsaved = true;
      this.debouncedHandleEdit();
    }
  }

  handleEdit() {
    this.$store
      .dispatch("asyncEditTodo", { id: this.id, title: this.editableTitle })
      .then(() => {
        this.unsaved = false;
      });
  }

  handleDelete() {
    this.$store.dispatch("asyncDeleteTodo", { id: this.id });
  }

  handleToggleComplete() {
    this.$store.dispatch("asyncToggleTodoCompleted", { id: this.id });
  }

  dragStart(event: DragEvent) {
    if (event.dataTransfer) {
      event.dataTransfer.setData("id", this.id);
    }
  }

  allowDrop(event: DragEvent) {
    event.preventDefault();
  }

  drop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer) {
      const draggedId = event.dataTransfer.getData("id");
      this.$store.dispatch("asyncSwapTodos", {
        firstId: draggedId,
        secondId: this.id
      });
    }
  }
}
</script>

<style scoped lang="scss">
.card {
  padding-top: 1rem;
  margin: 1.5rem;
  font-size: 1.5rem;
  list-style: none;
  background-color: pink;
  box-shadow: 10px 10px 12px 0px rgba(0, 0, 0, 0.75);
  display: block;
}
li {
  display: flex;
  justify-content: center;
  align-items: center;
}
.delete-button {
  height: 1.5rem;
  background-color: red;
  border: none;
  width: 100%;
  color: white;
}
.todo-checkbox {
  flex-grow: 1;
  height: 25px;
  width: 25px;
}
.completed {
  text-decoration: line-through;
  background-color: rgba(255, 0, 0, 0.5);
}
.invisible {
  opacity: 0;
}
img {
  flex-grow: 1;
}
textarea {
  resize: vertical;
  vertical-align: middle;
  flex-grow: 5;
  box-sizing: border-box;
  border: none;
  overflow: hidden;
  outline: none;
  background-color: inherit;
  font: inherit;
}
</style>
