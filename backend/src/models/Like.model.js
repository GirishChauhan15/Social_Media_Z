import mongoose from "mongoose";

const likeSchema = mongoose.Schema(
  {
    like: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export const Like = mongoose.model("Like", likeSchema);
