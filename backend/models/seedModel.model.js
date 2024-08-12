const mongoose = require("mongoose");

const booksSeedSchema = mongoose.Schema(
  {
    _id: {
      type: String,
      required: [true, "Please enter an ID"],
    },
    title: {
      type: String,
      unique: true,
      required: [true, "Please enter a title"],
    },
    author: {
      type: String,
      required: [true, "Please enter an author"],
    },
    dateOfPublication: {
      type: Date,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    genre: {
      type: String,
    },
    coverImg: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = new mongoose.model("SeedBooks", booksSeedSchema);
