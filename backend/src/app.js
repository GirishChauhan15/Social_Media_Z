import express from "express";
import cors from "cors";
import "dotenv/config";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "PUT", "PATCH", "POST", "DELETE"],
  })
);

app.get("/", (req, res) => {
  res.send("Server is running.");
});

import userRouter from "./routers/User.routes.js";
import postRouter from "./routers/Post.routes.js";
import commentRouter from "./routers/Comment.routes.js";
import likeRouter from "./routers/Like.routes.js";

app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
app.use("/api/comment", commentRouter);
app.use("/api/like", likeRouter);

export default app;
