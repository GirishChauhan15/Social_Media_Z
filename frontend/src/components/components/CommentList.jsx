import { usePost, useUserDetails } from "@/context";
import conf from "@/services/config_service";
import { MoreVertical, Trash2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {Button} from "./index";
import { toast } from "@/hooks/use-toast";

function CommentList({ postId }) {
  const [allComments, setAllComments] = useState([]);
  const { userDetails } = useUserDetails();
  const { allPostsInfo } = usePost();

  const allCommentsInfo = async () => {
    await conf
      .allComments({ postId })
      .then((res) => {
        res?.comments?.length > 0
          ? setAllComments(res.comments)
          : setAllComments([]);
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

  const deleteCommentHandler = async (commentId) => {
    await conf
      .deleteComment({ userId: userDetails?._id || " ", commentId })
      .then((res) => {
        if (res?.success) {
          allCommentsInfo();
          allPostsInfo();
          toast({
            title: "Success",
            description: `${res?.message || "Success."}`,
            variant: "success",
          });
        }
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

  useEffect(() => {
    allCommentsInfo();
  }, [setAllComments]);
  return (
    <div>
      {allComments?.length > 0 &&
        allComments.map((comment) => (
          <div
            className="flex items-center w-full border gap-4 rounded-lg border-zinc-400 my-2"
            key={comment?._id}
          >
            <div className="flex items-center w-full gap-4 m-2">
              <img
                src={comment?.owner?.image}
                alt="User_Image"
                className="w-6 aspect-square rounded-full"
                loading="lazy"
              />
              <p className="rounded-lg bg-gray-100 w-full text-start px-2 py-2 sm:text-xs md:text-sm lg:text-base">
                {comment?.comment}
              </p>
            </div>

            {String(comment?.owner?._id) === String(userDetails?._id) ? (
              <Popover>
                <PopoverTrigger>
                  <MoreVertical className="w-5 sm:w-6 lg:w-7" />
                </PopoverTrigger>
                <PopoverContent>
                  <Button
                    className="sm:text-xs md:text-xs lg:text-xs px-3 py-1 w-full flex justify-center items-center gap-2"
                    bgColor="bg-red-500"
                    onClick={() => {
                      deleteCommentHandler(comment?._id);
                    }}
                  >
                    <Trash2Icon className="w-4" /> Delete
                  </Button>
                </PopoverContent>
              </Popover>
            ) : (
              <div className="w-5 sm:w-6 lg:w-7"></div>
            )}
          </div>
        ))}
    </div>
  );
}

export default CommentList;
