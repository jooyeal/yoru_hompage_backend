const mongoose = require("mongoose");

const PhotoSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    comments: [
      {
        commentId: {
          type: String,
        },
        userId: {
          type: String,
        },
        desc: {
          type: String,
        },
      },
    ],
    img: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Photo", PhotoSchema);
