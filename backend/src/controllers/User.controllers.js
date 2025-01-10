import { Webhook } from "svix";
import { User } from "../models/User.model.js";
import { Comment } from "../models/Comment.model.js";
import { Post } from "../models/Post.model.js";
import { Like } from "../models/Like.model.js";

const clerkWebHook = async (req, res) => {
  try {
    const webHook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    await webHook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-signature": req.headers["svix-signature"],
      "svix-timestamp": req.headers["svix-timestamp"],
    });

    const { data, type } = req.body;

    if (type === "user.created") {
      const userData = {
        clerkId: data.id,
        email: data.email_addresses[0].email_address,
        firstName: data.first_name,
        lastName: data.last_name,
        image: data.image_url,
      };
      await User.create(userData);
      res.json({});
    } else if (type === "user.updated") {
      const userData = {
        email: data.email_addresses[0].email_address,
        firstName: data.first_name,
        lastName: data.last_name,
        image: data.image_url,
      };
      await User.findOneAndUpdate(
        { clerkId: data.id },
        { ...userData },
        { new: true }
      );
      res.json({});
    } else if (type === "user.deleted") {
      let userInfo = await User.findOne({ clerkId: data.id });
      let allPostInfo = await Post.find({ owner: userInfo?._id });

      if (allPostInfo?.length > 0) {
        allPostInfo.forEach(async (post) => {
          await Comment.deleteMany({ commentedPost: post._id });
          await Like.deleteMany({ like: post._id });
        });
      }
      if (userInfo) {
        await Comment.deleteMany({ owner: userInfo?._id });
        await Post.deleteMany({ owner: userInfo?._id });
        await Like.deleteMany({ owner: userInfo?._id });
        await User.findOneAndDelete({ _id: userInfo?._id });
        res.json({});
      }
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const user = await User.find();

    if (!user)
      return res
        .status(500)
        .json({ success: false, message: "Failed to fetch users." });

    return res.status(200).json({
      success: true,
      user,
      message: "Users list fetched successfully.",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getUserBYEmail = async (req, res) => {
  const { email } = req.body;
  if (!email?.trim())
    return res
      .status(400)
      .json({ success: false, message: "Invalid or non-existed user email." });
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(500)
        .json({ success: false, message: "Failed to fetch users." });

    return res.status(200).json({
      success: true,
      user,
      message: "User information fetched successfully.",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export { clerkWebHook, getAllUsers, getUserBYEmail };
