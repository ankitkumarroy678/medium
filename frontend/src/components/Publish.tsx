import axios from "axios";
import { AppBar } from "./AppBar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DATABASE_URL } from "../config";

export const Publish = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  return (
    <>
      <AppBar />
      <div className="flex justify-center">
        <div className="w-full max-w-lg mt-10">
          <div className="flex space-x-1">
            <input
              id="message"
              className=" p-2.5 w-full text-3xl font-serif text-gray-900  border-l-2 outline-none"
              placeholder="Title"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            ></input>
          </div>
          <textarea
            id="message"
            rows={3}
            className=" p-2.5 w-full text-lg text-gray-900 outline-none"
            placeholder="Tell your story..."
            onChange={(e) => {
              setContent(e.target.value);
            }}
          ></textarea>
          <button
            type="submit"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
            onClick={async () => {
              try {
                const response = await axios.post(
                  `${DATABASE_URL}/api/v1/blog`,
                  {
                    title,
                    content,
                  },
                  {
                    headers: {
                      Authorization: localStorage.getItem("token"),
                    },
                  }
                );
                navigate(`/blog/${response.data.id}`);
              } catch (error) {
                console.log(error);
              }
            }}
          >
            Post comment
          </button>
        </div>
      </div>
    </>
  );
};
