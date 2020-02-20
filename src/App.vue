<template>
  <v-app
    id="app"
    :style="{ background: this.$vuetify.theme.themes[theme].background }"
  >
    <Header>
      <FakeTodoFetcher />
    </Header>
    <v-content>
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </div>
      <transition name="view">
        <router-view />
      </transition>
    </v-content>
  </v-app>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import Header from "@/components/Header";
import FakeTodoFetcher from "@/components/FakeTodoFetcher";

@Component({
  components: { Header, FakeTodoFetcher }
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

.view-enter-active,
.view-leave-active {
  transition: opacity 0.3s ease-in-out, transform 0.3s ease;
}

.view-enter-active {
  transition-delay: 0.3s;
}

.view-enter,
.view-leave-to {
  opacity: 0;
  transform: translateY(100px);
}

.view-enter-to,
.view-leave {
  opacity: 1;
  transform: translateY(0px);
}
</style>
