import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#f44336",
        secondary: "#e57373",
        accent: "#ff1744",
        error: "#b71c1c",
        background: "#fcedef"
      },
      dark: {
        primary: "#9c27b0",
        secondary: "#335145",
        accent: "#828C51",
        error: "#b71c1c",
        background: "#141d26"
      }
    }
  }
});
