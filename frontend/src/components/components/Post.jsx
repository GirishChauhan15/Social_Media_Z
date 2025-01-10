import { Heart, MessageCircleMore, Send, Trash, X } from "lucide-react";
import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { usePost, useUserDetails } from "@/context";
import { useToast } from "@/hooks/use-toast";
import conf from "@/services/config_service";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, CommentList, TextArea, Container } from "./index";
import dayjs from "dayjs";

function Post({ post, showInfo = true }) {
  const [commentInput, setCommentInput] = useState("");
  const { isSignedIn, user } = useUser();
  const { userDetails } = useUserDetails();
  const { allPostsInfo, userInfo } = usePost();
  const { toast } = useToast();

  const likeUnlike = async (postId) => {
    await conf
      .likeUnlike({ postId, userId: userDetails?._id || " " })
      .then((res) => {
        allPostsInfo();
        toast({
          title: "Success",
          description: `${res?.message || "Success."}`,
        });
      })
      .catch((err) => {
        toast({
          title: "Uh oh! Something went wrong.",
          description:
            `${err?.message}` ||
            err ||
            "There was a problem with your request.",
          variant: "destructive",
        });
      });
  };

  const commentOnPost = async (postId) => {
    await conf
      .createComment({
        comment: commentInput,
        postId,
        userId: userDetails?._id || " ",
      })
      .then((res) => {
        allPostsInfo();
        toast({
          title: "Success",
          description: `${res?.message || "Success."}`,
          variant: "success",
        });
      })
      .catch((err) => {
        toast({
          title: "Uh oh! Something went wrong.",
          description:
            `${err?.message}` ||
            err ||
            "There was a problem with your request.",
          variant: "destructive",
        });
      })
      .finally(() => {
        setCommentInput("");
      });
  };

  const deletePost = async (postId) => {
    await conf
      .deletePost({ postId, userId: userDetails?._id || " " })
      .then((res) => {
        toast({
          title: "Success",
          description: `${res?.message || "Success."}`,
          variant: "success",
        });
        userInfo();
      })
      .catch((err) => {
        toast({
          title: "Uh oh! Something went wrong.",
          description:
            `${err?.message}` ||
            err ||
            "There was a problem with your request.",
          variant: "destructive",
        });
      });
  };

  const isLiked = (likeArray) => {
    return (
      likeArray?.length > 0 &&
      likeArray.find((item) => String(item?.owner) === String(userDetails?._id))
    );
  };

  return (
    <Container>
      <div
        key={post?._id}
        className="posts w-[90%] mx-auto flex flex-col gap-10 relative z-0 mt-5"
      >
        <div className="p-8 bg-white border border-gray-100 shadow-2xl aspect-auto rounded-3xl shadow-gray-600/10">
          <div className="flex gap-4 items-start">
            <img
              src={post?.owner?.image}
              alt="User-image"
              className="object-cover w-12 h-12 rounded-full"
              loading="lazy"
            />
            <div className="flex-1 flex justify-between items-start relative">
              <div>
                <h6 className="text-lg font-medium text-gray-700">{`${post?.owner?.firstName} ${post?.owner?.lastName}`}</h6>
                {post?.owner?._id === userDetails?._id && !showInfo && (
                  <button
                    onClick={() => {
                      deletePost(post?._id);
                    }}
                    className="flex justify-end absolute right-0 -top-4"
                  >
                    <Trash className="w-4 active:fill-red-500" />
                  </button>
                )}
                {post?.updatedAt && (
                  <p className="text-xs text-gray-500">
                    {dayjs(post?.updatedAt).format("DD-MM-YYYY, h:mm a")}
                  </p>
                )}
              </div>
            </div>
          </div>
          <p className="mt-8 bg-gray-50 px-5 py-2 rounded-lg">
            {post?.content}
          </p>

          {isSignedIn && showInfo && user?.fullName && (
            <div className="flex gap-5 flex-wrap font-extralight text-sm mt-8">
              <button onClick={() => likeUnlike(post?._id)}>
                <span className="flex gap-1 items-center">
                  <Heart
                    fill={`${isLiked(post?.LikeInfo || []) ? "red" : "white"}`}
                  />
                  {post?.LikeCount} Like
                </span>
              </button>
              <AlertDialog>
                <AlertDialogTrigger>
                  <span className="flex gap-1 items-center">
                    <MessageCircleMore />
                    {post?.CommentCount > 0
                      ? `${post?.CommentCount} Comments`
                      : `${post?.CommentCount} Comment`}
                  </span>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="flex justify-between items-center flex-wrap">
                      Comments 💬
                      <AlertDialogCancel>
                        <X />
                      </AlertDialogCancel>
                    </AlertDialogTitle>
                    <AlertDialogDescription asChild>
                      <div>
                        <CommentList postId={post?._id} />
                      </div>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
          {user?.fullName && showInfo && (
            <div className="my-1">
              <hr className="my-5" />
              <div className="flex items-center gap-4">
                <img
                  src={user?.imageUrl}
                  alt={user?.fullName}
                  className="rounded-full aspect-square w-7"
                  loading="lazy"
                />
                <TextArea
                  value={commentInput}
                  onChange={(e) => {
                    setCommentInput(e?.target?.value);
                  }}
                  maxLength={60}
                  placeholder="Write a comment"
                  className="bg-gray-50 outline-1 outline-zinc-300 rounded-3xl w-full "
                />
                <Button
                  onClick={() => {
                    commentOnPost(post?._id);
                  }}
                  className="sm:text-xs md:text-xs lg:text-xs px-2 py-[6px]"
                  disabled={commentInput?.trim() === "" ? true : false}
                >
                  <Send className="w-3 aspect-auto" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}

export default Post;
