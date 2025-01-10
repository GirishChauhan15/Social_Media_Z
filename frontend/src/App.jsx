import { PostForm, Post, Banner, MainLayout } from './components/components';
import { useUser } from "@clerk/clerk-react";
import { usePost } from "./context";
import { noDataImage, comingSoon, loadingImage } from "./assets";

function App() {
  const { isSignedIn, user, isLoaded } = useUser();
  const { somePosts, allPosts } = usePost();

  if (!isLoaded) {
    return (
      <div className="w-full h-screen min-h-screen flex justify-center items-center">
        <img src={loadingImage} className="w-72" alt="Loader" />
      </div>
    );
  }

  return (
    <MainLayout
      child1={
        <div className="mb-10 sm:mb-16 md:mb-0">
          {!isSignedIn && !user && <Banner />}
          {isSignedIn && user && <PostForm />}
          <div className="min-h-[650px]">
            {user?.fullName && isLoaded ? (
              allPosts?.length > 0 ? (
                allPosts.map((post) => <Post key={post?._id} post={post} />)
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
              )
            ) : null}

            {!user && !isSignedIn ? (
              somePosts?.length > 0 ? (
                somePosts.map((post) => <Post key={post._id} post={post} />)
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
              )
            ) : null}
          </div>
        </div>
      }
      child2={
        <>
          {[1, 2, 3].map((item) => (
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
  );
}

export default App;