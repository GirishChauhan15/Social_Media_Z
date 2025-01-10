import { isValidObjectId } from "mongoose";
import { Post } from "../models/Post.model.js";
import { User } from "../models/User.model.js";
import mongoose from "mongoose";

const createPost = async (req, res) => {
  const { content, userId } = req.body;
  if (!isValidObjectId(userId))
    return res
      .status(500)
      .json({ success: false, message: "Invalid or non-existed user Id." });

  if (!content?.trim())
    return res
      .status(400)
      .json({ success: false, message: "All fields are required." });

  try {
    const createNewPost = await Post.create({
      content,
      owner: userId,
    });

    if (!createNewPost)
      return res
        .status(500)
        .json({ success: false, message: "Failed to create a post." });

    return res.status(200).json({
      success: true,
      post: createNewPost,
      message: "Post created successfully.",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const allPost = await Post.aggregate([
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
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "commentedPost",
          as: "CommentCount",
        },
      },
      {
        $lookup: {
          from: "likes",
          localField: "_id",
          foreignField: "like",
          as: "LikeCount",
          pipeline: [
            {
              $project: {
                like: 1,
                owner: 1,
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
          CommentCount: {
            $size: "$CommentCount",
          },
          LikeCount: {
            $size: "$LikeCount",
          },
          LikeInfo: "$LikeCount",
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);
    if (!allPost)
      return res
        .status(500)
        .json({ success: false, message: "Failed to fetch posts." });

    return res.status(200).json({
      success: true,
      posts: allPost,
      message: "All posts fetched successfully.",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
const getPostById = async (req, res) => {
  const { postId } = req.params;
  if (!isValidObjectId(postId))
    return res
      .status(500)
      .json({ success: false, message: "Invalid or non-existed post Id." });
  try {
    const getPost = await Post.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(postId),
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
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "commentedPost",
          as: "CommentCount",
        },
      },
      {
        $lookup: {
          from: "likes",
          localField: "_id",
          foreignField: "like",
          as: "LikeCount",
          pipeline: [
            {
              $project: {
                like: 1,
                owner: 1,
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
          CommentCount: {
            $size: "$CommentCount",
          },
          LikeCount: {
            $size: "$LikeCount",
          },
          LikeInfo: "$LikeCount",
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);

    if (!getPost)
      return res
        .status(500)
        .json({ success: false, message: "Failed to fetch post." });

    return res.status(200).json({
      success: true,
      post: getPost,
      message: "Post fetched successfully.",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deletePost = async (req, res) => {
  const { userId, postId } = req.params;
  if (!isValidObjectId(userId) || !isValidObjectId(postId))
    return res.status(500).json({
      success: false,
      message: "Invalid or non-existed user Id or post Id.",
    });
  try {
    const deletedPost = await Post.findOneAndDelete({
      $and: [{ _id: postId }, { owner: userId }],
    });

    if (!deletedPost)
      return res
        .status(500)
        .json({ success: false, message: "Failed to delete a post." });

    return res.status(200).json({
      success: true,
      post: deletedPost,
      message: "Post deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const userDashboard = async (req, res) => {
  const { userId } = req.params;
  try {
    const info = await Post.aggregate([
      {
        $match: {
          owner: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "likes",
          localField: "_id",
          foreignField: "like",
          as: "like",
          pipeline: [
            {
              $project: {
                owner: 1,
              },
            },
          ],
        },
      },
      {
        $addFields: {
          like: {
            $size: "$like",
          },
        },
      },
    ]);

    let totalLike = 0;
    info?.length > 0
      ? info?.map((info) => {
          totalLike += info?.like || 0;
        })
      : null;

    const AllInfoUser = await User.findById({ _id: userId }).select("-clerkId");

    const postInfo = await Post.aggregate([
      {
        $match: {
          owner: new mongoose.Types.ObjectId(userId),
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
        $sort: {
          createdAt: -1,
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      data: { userInfo: AllInfoUser, posts: postInfo, LikeCount: totalLike },
      message: "All posts fetched successfully.",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const beforeLoginPosts = async (req, res) => {
  try {
    const somePost = await Post.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "owner",
          foreignField: "_id",
          as: "owner",
          pipeline: [
            {
              $project: {
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
        $sort: {
          createdAt: -1,
        },
      },
      {
        $limit: 5,
      },
    ]);
    if (!somePost)
      return res
        .status(500)
        .json({ success: false, message: "Failed to fetch posts." });

    return res.status(200).json({
      success: true,
      posts: somePost,
      message: "All posts fetched successfully.",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export {
  createPost,
  getAllPosts,
  deletePost,
  getPostById,
  beforeLoginPosts,
  userDashboard,
};
