import { Module, VuexModule, Mutation } from "vuex-module-decorators";

@Module
export default class DarkMode extends VuexModule {
  active = false;

  @Mutation
  toggleDarkMode() {
    this.active = !this.active;
  }
}
