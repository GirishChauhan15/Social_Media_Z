import { Container, MainLayout, Post } from '../components/components/index';
import { usePost } from "@/context";
import { useClerk } from "@clerk/clerk-react";
import { SettingsIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { noDataImage, comingSoon, loadingImage } from "../assets";
import { useNavigate } from "react-router-dom";

function UserDashboard() {
  const { allInfo } = usePost();
  const [userInfo, setUserInfo] = useState({});
  const [postData, setPostData] = useState([]);
  const [likeCount, setLikeCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { openUserProfile } = useClerk();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
    if (allInfo?.userInfo) {
      allInfo?.userInfo ? (
        setUserInfo(allInfo?.userInfo),
        setPostData(allInfo?.posts),
        setLikeCount(allInfo?.LikeCount)
      ) : navigate("/")
    }
  }, [allInfo]);

  if (loading) {
    return (
      <div className="w-full bg-white h-screen min-h-screen flex justify-center items-center">
        <img src={loadingImage} className="w-72" alt="Loader" />
      </div>
    );
  }

  return (
    <>
      <MainLayout
        child1={
          <>
            <Container>
              <div className="min-h-[300px] w-full flex justify-center pt-10">
                <div className="h-56 w-72 absolute flex justify-center items-center">
                  <div className="bg-gray-100 p-1 rounded-full">
                    <img
                      src={userInfo?.image}
                      alt={userInfo?.firstName}
                      className="object-cover h-20 w-20 rounded-full"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className=" h-56 mx-4 w-5/6 [backgroundImage:linear-gradient(#212121,#f7f7f7)] rounded-3xl shadow-md sm:w-80 sm:mx-0">
                  <div className="h-1/2 w-full flex justify-end items-baseline px-3 py-5 relative">
                    <p
                      className="text-sm flex items-center gap-1 justify-center text-white cursor-pointer select-none"
                      onClick={() => openUserProfile()}
                    >
                      <SettingsIcon className="w-4" /> Edit Profile
                    </p>
                  </div>

                  <div className="bg-white h-1/2 w-full rounded-3xl flex flex-col justify-around items-center">
                    <div className="w-full h-1/2 flex justify-between items-center px-3 pt-2">
                      <div className="flex flex-col justify-center items-center">
                        <p className="text-gray-500 text-xs">Posts</p>
                        <p className="text-gray-600 text-sm">
                          {postData?.length || 0}
                        </p>
                      </div>
                      <div className="flex flex-col justify-center items-center">
                        <p className="text-gray-500 text-xs">Likes</p>
                        <p className="text-gray-600 text-sm">
                          {likeCount || 0}
                        </p>
                      </div>
                    </div>
                    <div className="w-full h-1/2 flex flex-col justify-center items-center">
                      <p className="text-gray-700 font-bold">
                        {userInfo?.firstName + " " + userInfo?.lastName}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="min-h-[650px]">
                {postData?.length > 0 ? (
                  postData.map((post) => (
                    <Post key={post?._id} post={post} showInfo={false} />
                  ))
                ) : (
                  <div className="max-h-[500px] h-fit w-[90%] m-auto pt-10">
                    <div className="text-center flex justify-center items-center flex-col">
                      <img
                        src={noDataImage}
                        alt="No data"
                        className="max-w-[70%] object-cover"
                        loading="lazy"
                      />
                      <p className="text-[.5rem]">
                        Designed by <br />
                        <a
                          target="_blank"
                          className="text-red-400 hover:text-red-600"
                          href="https://www.freepik.com/free-vector/hand-drawn-no-data-illustration_49639856.htm"
                        >
                          Freepik
                        </a>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </Container>
          </>
        }
        child2={
          <>
            {[1, 2, 3]?.map((item) => (
              <img
                key={item}
                src={comingSoon}
                className="my-10 w-[50%] cursor-no-drop sm:w-2/5 md:w-5/6 aspect-square m-auto rounded-md"
                alt="Coming-soon"
                loading="lazy"
              />
            ))}
          </>
        }
      ></MainLayout>
    </>
  );
}

export default UserDashboard;
