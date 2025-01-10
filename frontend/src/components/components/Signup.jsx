import { useClerk } from "@clerk/clerk-react";
import {Button} from "./index";

function Signup({ className = {} }) {
  const clerk = useClerk();
  return (
    <Button
      className={`${className}`}
      onClick={() =>
        clerk?.openSignUp({
          redirectUrl: "/",
        })
      }
    >
      Sign up
    </Button>
  );
}

export default Signup;
