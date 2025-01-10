import { Form, Container } from './index'
import { useUser } from "@clerk/clerk-react";
import { usePost, useUserDetails } from "@/context";
import conf from "@/services/config_service";
import { toast } from "@/hooks/use-toast";

function PostForm() {
  const { user } = useUser();
  const { content, allPostsInfo, setContent } = usePost();
  const { userDetails } = useUserDetails();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let userId = userDetails?._id || " ";
    await conf
      .createPost({ content, userId })
      .then((res) => {
        allPostsInfo();
        toast({
          title: "All Set! Your Post is Up!",
          description: `${res?.message || "Success."}`,
          variant: "success",
        });
      })
      .catch((err) => {
        toast({
          title: "Uh-oh! Your Post Didn't Go Through.",
          description:
            `${err?.message}` ||
            err ||
            "There was a problem with your request.",
          variant: "destructive",
        });
      })
      .finally(() => {
        setContent("");
      });
  };

  return (
    <>
      <Container className="select-none">
        <div className="w-[90%] m-auto py-6">
          <h2 className="text-2xl font-extrabold text-gray-800 mb-1">
            👋🏻 Hello, {user?.fullName || "User"}
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Share your thoughts, ideas, or anything exciting.
          </p>
        </div>
      </Container>
      <form onSubmit={handleSubmit}>
        <Form />
      </form>
    </>
  );
}

export default PostForm;
