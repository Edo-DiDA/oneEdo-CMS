export default {
  beforeCreate(event) {
    const { data, where, select, populate } = event.params;

    // console.log(JSON.stringify(data, null, 2));
    console.log("beforeCreate");
  },

  afterCreate(event) {
    const { result, params } = event;
    // console.log(JSON.stringify(result, null, 2));
    // console.log("afterCreate");
  },

  beforeFindOne(event) {
    // console.log(JSON.stringify(event, null, 2));
    // console.log("beforeFindOne");
  },

  afterFindOne(event) {
    // console.log(JSON.stringify(event, null, 2));
    // console.log("afterFindOne");
    event.result = [];
  },

  beforeFindMany(event) {
    // console.log(JSON.stringify(event, null, 2));
    // console.log("beforeFindMany");
  },

  afterFindMany(event) {
    // console.log(JSON.stringify(event, null, 2));
    // console.log("afterFindMany");
  },
};
