import { forwardRef } from "react";
import {Signup} from "./index";
import { UserButton, useUser } from "@clerk/clerk-react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {logo} from "../../assets";

function SideNav({ navItems = [] }, ref) {
  const { isSignedIn, user } = useUser();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <aside
      className="h-full p-5 border-r flex justify-between flex-col"
      ref={ref}
    >
      <div>
        <div className="w-full flex justify-center items-center mb-5">
          <Link
            to={"/"}
            onClick={(e) => {
              location?.pathname !== "/" ? navigate("/") : e.preventDefault();
            }}
          >
            <img
              src={logo}
              alt="logo"
              className="w-8 sm:w-10 md:w-12 aspect-square"
              loading="lazy"
            />
          </Link>
        </div>
        <div className="flex flex-col">
          {navItems?.map((item) => (
            <div key={item?.id}>
              {item?.show && (
                <NavLink
                  to={item?.path}
                  onClick={(e) => {
                    location?.pathname !== item?.path
                      ? navigate(item?.path)
                      : e.preventDefault();
                  }}
                  className={({
                    isActive,
                  }) => `group text-xs sm:text-sm p-4 flex gap-5 items-center
                justify-start rounded-md cursor-pointer delay-100
                 hover:bg-slate-100 text-slate-500 mb-2 ${
                   isActive && "bg-slate-200"
                 }`}
                >
                  <item.icon className="group-hover:animate-pulse" />
                  {item?.name}
                </NavLink>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className=" flex gap-3 items-center">
        {isSignedIn && user?.fullName ? (
          <>
            <div className="flex justify-center items-center gap-2">
              <div className="flex justify-center">
                <UserButton />
              </div>
              <h5 className="text-xs sm:text-sm md:text-base lg:text-lg">
                {user?.firstName}
              </h5>
            </div>
          </>
        ) : (
          <Signup className={"text-xs sm:text-xs md:text-xs lg:text-xs"} />
        )}
      </div>
    </aside>
  );
}

export default forwardRef(SideNav);
