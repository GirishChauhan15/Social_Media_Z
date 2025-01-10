import {Signup, Container} from './index'
import {heroImage} from "../../assets";

function Banner() {
  return (
    <Container className="select-none">
      <div className="bg-gray-100 mt-5 min-h-52 flex flex-wrap w-[90%] m-auto rounded-lg p-5 pt-4">
        <div className="w-full sm:w-[50%] flex justify-center items-center relative">
          <div className="text-center">
            <img src={heroImage} alt="Hero_Image" className="cursor-pointer" loading="lazy" />
            <p className="text-[.5rem]">
              Designed by <br />
              <a
                target="_blank"
                className="text-red-400 hover:text-red-600"
                href="https://www.freepik.com/free-vector/gen-z-concept-illustration_19896103.htm#fromView=keyword&page=1&position=29&uuid=c169d910-0a57-440e-96af-40328f83f376&new_detail=true"
              >
                Freepik
              </a>
            </p>
          </div>
        </div>
        <div className="w-[80%] pt-10 sm:pt-0 pl-5 m-auto text-center sm:w-[50%] flex justify-center gap-2 items-center flex-col sm:block">
          <h1 className="text-4xl text-zinc-700 font-bold lg:text-3xl text-start">
            Welcome to Z<br />
            <span className="text-2xl block text-zinc-500 pt-3 leading-7">
              Where Your Words Shape the World
            </span>
          </h1>
          <p className="my-2 text-sm md:text-base text-start">
            Your voice matters. Share your thoughts, connect with like-minded
            individuals, and watch your ideas create ripples. The world is
            listening - make your mark today.
          </p>
          <Signup
            className={"text-xs sm:text-xs md:text-xs lg:text-xs mt-5 "}
          />
        </div>
      </div>
    </Container>
  );
}

export default Banner;
