import { useEffect, useState } from "react";
import axios from "axios";
import { DATABASE_URL } from "../config";

export interface Blogs {
  content: string;
  title: string;
  id: string;
  author: {
    name: string;
  };
}

export const useBlog = ({ id }: { id: string }) => {
  const [blog, setBlog] = useState<Blogs>({
    content: "",
    title: ":",
    id: "",
    author: {
      name: "",
    },
  });
  const [loading, setLoding] = useState(true);

  useEffect(() => {
    axios
      .get(`${DATABASE_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setBlog(response.data);
        setLoding(false);
      });
  }, []);
  console.log(blog);
  return {
    loading,
    blog,
  };
};

export const useBlogs = () => {
  const [loading, setLoding] = useState(true);
  const [blogs, setBlogs] = useState<Blogs[]>([]);

  useEffect(() => {
    axios
      .get(`${DATABASE_URL}/api/v1/blog/bulk`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setBlogs(response.data);
        setLoding(false);
      });
  }, []);
  return {
    loading,
    blogs,
  };
};
