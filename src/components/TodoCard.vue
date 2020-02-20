<template>
  <v-card
    class="card"
    elevation="10"
    draggable="true"
    :loading="unsaved"
    @dragstart="dragStart"
    @drop="drop"
    @dragover="allowDrop"
  >
    <v-textarea
      class="headline"
      solo
      flat
      rows="1"
      auto-grow
      v-model.trim="editableTitle"
      :disabled="completed"
    />
    <v-card-actions class="card-action-area">
      <v-checkbox
        v-model="completed"
        class="todo-checkbox"
        :indeterminate="unsaved"
        :disabled="unsaved"
        @change="handleToggleComplete"
      />
      <v-spacer></v-spacer>
      <v-btn
        text
        class="delete-button"
        color="red accent-4"
        @click="handleDelete"
      >
        Delete
      </v-btn>
    </v-card-actions>
  </v-card>
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
  margin: 1.5rem;
}
.card-action-area {
  height: 3rem;
}
</style>
