import { Menu } from "lucide-react";
import {Signup} from "./index";
import { UserButton, useUser } from "@clerk/clerk-react";

function Header({ toggleSideBar }) {
  const { isSignedIn, user } = useUser();

  return (
    <header className="flex flex-wrap border-b py-2">
      <div className=" w-[50%] px-2 pt-2 text-slate-500 cursor-pointer">
        <Menu className="md:hidden" onClick={() => toggleSideBar()} />
      </div>
      <div className=" w-[50%] flex flex-col-reverse items-end sm:flex-row sm:justify-end gap-4 px-2 flex-wrap">
        {isSignedIn && user?.fullName ? (
          <div className="flex justify-center items-center gap-2">
            <h5 className="text-xs sm:text-sm md:text-base lg:text-lg">
              {user?.firstName}
            </h5>
            <div className="flex justify-center">
              <UserButton />
            </div>
          </div>
        ) : (
          <>
            <div className="w-fit h-10 m-1">
              <Signup className={"text-xs sm:text-xs md:text-xs lg:text-xs"} />
            </div>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
