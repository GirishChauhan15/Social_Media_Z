import { isValidObjectId } from "mongoose";
import { Like } from "../models/Like.model.js";
import mongoose from "mongoose";

const likeAndUnlike = async (req, res) => {
  const { postId, userId } = req.body;
  if (!isValidObjectId(userId) || !isValidObjectId(postId))
    return res.status(500).json({
      success: false,
      message: "Invalid or non-existed user Id or post Id.",
    });
  try {
    const isLike = await Like.findOne({ like: postId, owner: userId });

    if (!isLike) {
      const likeThePost = await Like.create({
        like: postId,
        owner: userId,
      });
      if (!likeThePost)
        return res
          .status(500)
          .json({ success: false, message: "Failed to like a post." });

      const LikeInfo = await Like.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(likeThePost._id),
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "owner",
            foreignField: "_id",
            as: "owner",
            pipeline: [
              {
                $project: {
                  email: 1,
                  image: 1,
                  firstName: 1,
                  lastName: 1,
                },
              },
            ],
          },
        },
        {
          $project: {
            like: 1,
            owner: 1,
            createdAt: 1,
            updatedAt: 1,
          },
        },
      ]);

      return res.status(200).json({
        success: true,
        like: LikeInfo,
        message: "Like successfully.",
      });
    } else {
      const unlike = await Like.findByIdAndDelete(isLike._id);
      if (!unlike)
        return res
          .status(500)
          .json({ success: false, message: "Failed to unlike a post." });

      return res.status(200).json({
        success: true,
        unlike,
        message: "Unlike successfully.",
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export { likeAndUnlike };
