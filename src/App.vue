<template>
  <v-app
    id="app"
    :style="{ background: this.$vuetify.theme.themes[theme].background }"
  >
    <Header />
    <v-content>
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </div>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import Header from "@/components/Header";

@Component({
  components: { Header }
})
export default class App extends Vue {
  get theme() {
    return this.$vuetify.theme.dark ? "dark" : "light";
  }
  handleToggleDarkTheme() {
    this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
  }
}
</script>

<style lang="scss">
#app {
  text-align: center;
  min-height: 100vh;
}
#nav {
  padding: 1rem;
  a {
    font-weight: bold;
    &.router-link-exact-active {
      color: blueviolet;
    }
  }
}
</style>
