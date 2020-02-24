export default {
  methods: {
    fetchAlert(clickHandler: Function) {
      clickHandler();
      alert("Data Fetched Successfully");
    }
  }
};
