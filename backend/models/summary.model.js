const mongoose = require("mongoose");

const summarySchema = mongoose.Schema(
  {
    book: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "books",
    },
    summary: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = new mongoose.model("Summary", summarySchema);
