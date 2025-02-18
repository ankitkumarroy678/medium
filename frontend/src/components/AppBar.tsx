import { Bell, Ellipsis } from "lucide-react";
import logo from "../assets/medium.png";
import { Link } from "react-router-dom";

export const AppBar = () => {
  return (
    <>
      <div className="flex items-center justify-between px-16 mb-8 mt-3">
        <div className="flex items-center gap-2">
          <img src={logo} alt="" className="w-10" />
          <h1>Ankit</h1>
          <p>saved</p>
        </div>
        <div className="flex items-centers space-x-5">
          <Link to={"/publish"}>
            <button className="bg-green-600 rounded-full text-sm px-3 text-white">
              Publish
            </button>
          </Link>
          <Ellipsis color="gray" />
          <Bell size={17} className="mt-1 font-light" />
          <Avatar name="ANkit" />
        </div>
      </div>
    </>
  );
};

function Avatar({ name }: { name: string }) {
  return (
    <>
      <div className="relative flex items-center justify-center w-7 h-7  overflow-hidden bg-gray-100 pt-[1px] rounded-full dark:bg-gray-600 mr-1">
        <span className="font-semibold  text-gray-600 pb-[2px] text-[12px] dark:text-gray-300">
          {name.slice(0, 2)}
        </span>
      </div>
    </>
  );
}
