<template>
  <v-btn type="button" @click="fetchAlert(handleFetchFakeClick)">
    Fetch Fake
  </v-btn>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import fetchAlertMixin from "@/mixins/fetchAlertMixin";
import { FETCH_TODOS } from "@/store/types/actions";

@Component({
  mixins: [fetchAlertMixin]
})
export default class FakeTodoFetcher extends Vue {
  handleFetchFakeClick() {
    this.$store.dispatch(FETCH_TODOS);
  }
}
</script>
