export default {
  methods: {
    userConfirm(clickHandler: Function) {
      const answer = confirm("Do you want to fetch fake data?");
      if (answer) clickHandler();
    }
  }
};
