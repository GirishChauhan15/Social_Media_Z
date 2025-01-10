import { useUser } from "@clerk/clerk-react";
import { usePost } from "@/context";
import { ImageUpIcon } from "lucide-react";
import { Button, Container, TextArea } from './index'

function Form() {
  const { isSignedIn, user } = useUser();
  const { content, setContent } = usePost();

  return (
    <Container>
      <div className="bg-gray-100 p-4 min-h-24 w-[90%] m-auto flex flex-col flex-wrap gap-4 rounded-lg">
        <div className="flex gap-4 items-start">
          {isSignedIn && (
            <img
              src={user?.imageUrl}
              alt="User-image"
              className="object-cover aspect-square w-10 rounded-full"
              loading="lazy"
            />
          )}
          <TextArea
            className="w-full border-[1px] bg-gray-50 outline-none border-zinc-300 resize-none px-3 py-2 rounded-lg"
            rows={2}
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => {
              setContent(e?.target?.value);
            }}
            maxLength={200}
          />
        </div>
        <div className="flex flex-wrap justify-between items-center">
          <ImageUpIcon
            className="stroke-gray-400 cursor-not-allowed"
            width={20}
          />
          <div className="flex gap-4 justify-end items-center">
            <div className="text-sm text-gray-400 text-end select-none">
              {`${content?.length}/200`}
            </div>
            <Button
              className="sm:text-xs md:text-xs lg:text-xs"
              disabled={content?.trim() === "" ? true : false}
            >
              Post
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Form;
