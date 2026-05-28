const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: new Date().toDateString(),
  },
});

const Notice = mongoose.model("Notice", noticeSchema);

module.exports = Notice;