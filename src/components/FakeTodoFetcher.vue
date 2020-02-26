<template>
  <v-btn type="button" @click="userConfirm(handleFetchFakeClick)">
    Fetch Fake
  </v-btn>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import userConfirmMixin from "@/mixins/userConfirmMixin";
import { FETCH_TODOS } from "@/store/types/actions";

@Component({
  mixins: [userConfirmMixin]
})
export default class FakeTodoFetcher extends Vue {
  handleFetchFakeClick() {
    this.$store.dispatch(FETCH_TODOS);
  }
}
</script>
