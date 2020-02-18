import Vue from "vue";
import Vuex from "vuex";
import Todos from "./todos";
import DarkMode from "./darkMode";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  modules: {
    Todos,
    DarkMode
  },
  strict: debug
});
