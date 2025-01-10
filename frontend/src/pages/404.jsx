import {errorImage} from "../assets";
import { Link } from "react-router-dom";
import { Button, Container } from '../components/components/index';

function Error404() {
  return (
    <Container>
      <div className="h-screen min-h-[400px] w-full flex justify-center items-center">
        <div className="bg-gray-200 p-4 sm:p-10 rounded-lg flex flex-col justify-center gap-2 items-center md:flex-row md:gap-4">
          <div className="w-1/2 flex justify-center items-center flex-col">
            <img
              src={errorImage}
              alt="Error_404"
              className="object-cover block w-full md:w-4/5 lg:w-3/5"
              loading="lazy"
            />
            <p className="text-[.5rem]">
              Designed by <br />
              <a
                target="_blank"
                className="text-red-400 hover:text-red-600"
                href="https://www.freepik.com/free-vector/404-error-with-portals-concept-illustration_20602754.htm#fromView=keyword&page=1&position=19&uuid=96460cef-b278-496a-bd9c-3833ebb8fc67&new_detail=true"
              >
                Freepik
              </a>
            </p>
          </div>

          <div className="flex md:flex flex-col justify-between items-center md:w-3/4 lg:w-1/2">
            <div className="px-10">
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-600 my-4">
                Oops! Page Not Found
              </h3>
              <p className="text-lg lg:text-xl text-zinc-700">
                It seems we can't find the page you're looking for. Don’t worry,
                it happens to the best of us! Here is a helpful links to get you
                back on track.
              </p>
            </div>
            <Button className="my-5">
              <Link to={"/"}>Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Error404;
