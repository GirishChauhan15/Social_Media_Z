import { useEffect, useRef, useState } from "react";
import { Home, User } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { Header, SideNav, Container } from './index'

function MainLayout({ child1 = "", child2 = "" }) {
  const [toggleSideBar, setToggleSideBar] = useState(false);
  const navRef = useRef();
  const { isSignedIn } = useUser();

  const navItems = [
    {
      id: 1,
      name: "Home",
      path: "/",
      icon: Home,
      show: true,
    },
    {
      id: 2,
      name: "Profile",
      path: "/profile",
      icon: User,
      show: isSignedIn,
    },
  ];

  useEffect(() => {
    const navHandler = (e) => {
      if (!navRef?.current?.contains(e.target)) {
        setToggleSideBar(false);
      }
      return () => {
        window.removeEventListener("mousedown", navHandler);
      };
    };
    window.addEventListener("mousedown", navHandler);
  }, [setToggleSideBar]);

  return (
    <main>
      <Container>
        <div className="relative">
          <div className=" hidden md:w-48 lg:w-64 md:block h-screen fixed">
            <SideNav navItems={navItems} />
          </div>

          {toggleSideBar && (
            <div className="bg-white fixed z-50 md:w-48 lg:w-64 md:block h-screen">
              <SideNav
                navItems={navItems}
                ref={navRef}
                toggleSideBar={() => setToggleSideBar(false)}
              />
            </div>
          )}

          <div className="md:ml-48 lg:ml-64">
            <Header toggleSideBar={() => setToggleSideBar((prev) => !prev)} />
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div
                className={`${
                  child2 !== "" ? "md:col-span-2" : "md:col-span-full"
                }`}
              >
                {child1}
              </div>
              {child2 !== "" && (
                <div className="p-5 mt-5 sm:shadow-none sm:py-0 sm:mt-0 flex flex-col justify-start items-center bg-[#454545]">
                  {child2}
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}

export default MainLayout;
