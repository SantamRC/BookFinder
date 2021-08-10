const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Books = new Schema({
  username: {
    type: String,
  },
  Books: [
    {
      Title: {
        type: String,
      },
      Author: {
        type: String,
      },
      Date: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("Books", Books);
