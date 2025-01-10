import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useClerk, useUser } from "@clerk/clerk-react";
import authServices from "./services/auth";
import conf from "./services/config_service";
import { PostProvider, UserProvider } from "./context";
import { toast } from "./hooks/use-toast";

function Layout() {
  const [allPosts, setAllPosts] = useState([]);
  const [somePosts, setSomePosts] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [content, setContent] = useState("");
  const [allInfo, setAllInfo] = useState({});
  const { isSignedIn, user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const location = useLocation();

  const allPostsInfo = async () => {
    await conf
      .allPost()
      .then((res) => {
        res?.posts?.length > 0 ? setAllPosts(res?.posts) : setAllPosts([]);
        userInfo();
      })
      .catch((err) => {
        toast({
          title: "Uh oh! Something went wrong.",
          description:
            `${err?.message || err}` ||
            "There was a problem with your request.",
          variant: "destructive",
        });
      })
  };
  
  const userInfo = async () => {
    setUserDetails({});
    if (isSignedIn && user) {
      const email = user?.primaryEmailAddress?.emailAddress || "";
      await authServices
        .userByEmail({ email })
        .then(async (res) => {
          setUserDetails(res?.user);
        })
        .catch((err) => {
          if (err) {
            signOut({ redirectUrl: "/" });
          }
        })
    }
  };
  const somePostsInfo = async () => {
    await conf
      .somePost()
      .then(async (res) => {
        (await res?.posts?.length) > 0
          ? setSomePosts(res?.posts)
          : setSomePosts([]);
      })
      .catch((err) => {
        toast({
          title: "Uh oh! Something went wrong.",
          description:
            `${err?.message || err}` ||
            "There was a problem with your request.",
          variant: "destructive",
        });
      })
  };

  const dashboardInfo = async (userId) => {
    setAllInfo({})
    await conf
      .dashboard({ userId })
      .then(async (res) => {
        res?.data ? setAllInfo(res?.data) : setAllInfo({});
      })
      .catch((err) => {
        toast({
          title: "Uh oh! Something went wrong.",
          description:
            `${err?.message || err}` ||
            "There was a problem with your request.",
          variant: "destructive",
        });
      })
  };

  useEffect(() => {
    if (isSignedIn && user) {
      setUserDetails({});
      allPostsInfo();
    }
    somePostsInfo()
  }, [isLoaded, location]);

  useEffect(() => {
    let refreshedInfo = () => {
      if (user) {
        if (userDetails && userDetails?._id) {
          let oldData = {
            fullName: userDetails?.firstName + " " + userDetails?.lastName,
            emailAddress: userDetails?.email,
            imageUrl: userDetails?.image,
          };
          let newData = {
            fullName: user?.fullName,
            emailAddress: user?.primaryEmailAddress?.emailAddress,
            imageUrl: user?.imageUrl,
          };
          if (JSON.stringify(oldData) !== JSON.stringify(newData)) {
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }
        }
      }
    };
    refreshedInfo();
  }, [isSignedIn, user]);

  useEffect(() => {
    if (userDetails?._id) {
      dashboardInfo(userDetails?._id);
    }
  }, [userDetails, location]);

  return (
    <UserProvider value={{ userDetails, setUserDetails, userInfo }}>
      <PostProvider
        value={{
          content,
          setContent,
          allPosts,
          setAllPosts,
          allPostsInfo,
          somePosts,
          setSomePosts,
          allInfo,
          userInfo,
        }}
      >
        <Outlet />
      </PostProvider>
    </UserProvider>
  );
}

export default Layout;
