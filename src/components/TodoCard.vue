<template>
  <v-card
    class="card"
    elevation="10"
    draggable="true"
    :loading="unsaved"
    @dragstart="dragStart"
    @drop.prevent="drop"
    @dragover.prevent
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
        :value="completed"
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
import {
  EDIT_TODO,
  DELETE_TODO,
  TOGGLE_TODO,
  SWAP_TODOS
} from "@/store/types/mutations";

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
    this.$store.commit(EDIT_TODO, { id: this.id, title: this.editableTitle });
    this.unsaved = false;
  }

  handleDelete() {
    this.$store.commit(DELETE_TODO, { id: this.id });
  }

  handleToggleComplete() {
    this.$store.commit(TOGGLE_TODO, { id: this.id });
  }

  dragStart(event: DragEvent) {
    if (event.dataTransfer) {
      event.dataTransfer.setData("id", this.id);
    }
  }

  drop(event: DragEvent) {
    if (event.dataTransfer) {
      const draggedId = event.dataTransfer.getData("id");
      this.$store.commit(SWAP_TODOS, {
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
