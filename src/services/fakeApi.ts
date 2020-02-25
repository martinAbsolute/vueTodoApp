import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

const FakeApiService = {
  init() {
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = "https://reqres.in/api";
  },

  setHeader() {
    Vue.axios.defaults.headers.common[
      "Authorization"
    ] = `Token TOKEN_PLACEHOLDER`;
  },

  get(resourse: string, slug = "") {
    return Vue.axios.get(`${resourse}/${slug}`).catch(error => {
      throw new Error(error);
    });
  }
};

export default FakeApiService;
