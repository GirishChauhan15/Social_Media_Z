import { isValidObjectId } from "mongoose";
import { Comment } from "../models/Comment.model.js";
import mongoose from "mongoose";

const getAllComments = async (req, res) => {
  const { postId } = req.body;
  if (!isValidObjectId(postId))
    return res
      .status(500)
      .json({ success: false, message: "Invalid or non-existed post Id." });
  try {
    const allComment = await Comment.aggregate([
      {
        $match: {
          commentedPost: new mongoose.Types.ObjectId(postId),
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
        $addFields: {
          owner: {
            $first: "$owner",
          },
        },
      },
      {
        $project: {
          comment: 1,
          owner: 1,
          createdAt: 1,
          updatedAt: 1,
          postInfo: 1,
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);
    if (!allComment)
      return res
        .status(500)
        .json({ success: false, message: "Failed to fetch comments." });

    return res.status(200).json({
      success: true,
      comments: allComment,
      message: "All comments fetched successfully.",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const commentOnPost = async (req, res) => {
  const { comment, userId, postId } = req.body;

  if (!isValidObjectId(userId) || !isValidObjectId(postId))
    return res.status(400).json({
      success: false,
      message: "Invalid or non-existed user Id or post Id.",
    });

  if (!comment?.trim())
    return res
      .status(400)
      .json({ success: false, message: "All fields are required." });

  try {
    const createNewComment = await Comment.create({
      comment,
      owner: userId,
      commentedPost: postId,
    });

    if (!createNewComment)
      return res
        .status(500)
        .json({ success: false, message: "Failed to comment." });

    return res.status(200).json({
      success: true,
      comment: createNewComment,
      message: "Commented successfully.",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deleteAComment = async (req, res) => {
  const { userId, commentId } = req.params;

  if (!isValidObjectId(userId) || !isValidObjectId(commentId))
    return res.status(400).json({
      success: false,
      message: "Invalid or non-existed user Id or comment Id.",
    });

  try {
    const deletedComment = await Comment.findOneAndDelete({
      $and: [{ _id: commentId }, { owner: userId }],
    });

    if (!deletedComment)
      return res
        .status(500)
        .json({ success: false, message: "Failed to delete a comment." });

    return res.status(200).json({
      success: true,
      comment: deletedComment,
      message: "Comment deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export { getAllComments, commentOnPost, deleteAComment };
