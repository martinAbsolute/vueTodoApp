<template>
  <v-app-bar app dense fixed color="primary">
    <v-toolbar-title>{{ "vueTodoApp" | capitalize }}</v-toolbar-title>
    <v-spacer></v-spacer>
    <slot></slot>
    <v-btn icon @click="handleToggleDarkTheme">
      <v-icon>mdi-theme-light-dark</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

@Component({
  filters: {
    capitalize: function(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  }
})
export default class Header extends Vue {
  handleToggleDarkTheme() {
    this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
  }
}
</script>
