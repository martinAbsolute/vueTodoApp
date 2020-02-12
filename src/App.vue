<template>
  <div id="app" v-bind:class="{ 'dark-mode': darkModeActive }">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
    <button class="button-darkmode" @click="toggleDarkMode">
      Toggle Darkmode
    </button>
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import store from "./store";

@Component
export default class App extends Vue {
  get darkModeActive() {
    return store.state.darkMode;
  }
  toggleDarkMode() {
    store.commit("toggleDarkMode");
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: pink;

    &.router-link-exact-active {
      color: red;
    }
  }
}

.dark-mode {
  background-color: #2c3e50;
}

.button-darkmode {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
