import { forwardRef } from "react";

function TextArea({ className = "", ...props }, ref) {
  return (
    <textarea
      rows={1}
      ref={ref}
      className={`outline-none bg-gray-200 px-3 py-1 resize-none rounded-lg placeholder:text-zinc-600 ${className}`}
      {...props}
    />
  );
}

export default forwardRef(TextArea);
