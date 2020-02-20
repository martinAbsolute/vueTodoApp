<template>
  <v-app-bar app dense fixed color="primary">
    <v-toolbar-title>vueTodoApp</v-toolbar-title>
    <v-spacer></v-spacer>
    <slot></slot>
    <v-btn icon @click="handleToggleDarkTheme">
      <v-icon>mdi-theme-light-dark</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Header extends Vue {
  handleToggleDarkTheme() {
    this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
  }
}
</script>
