import { AppBar } from "../components/AppBar";
import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();
  if (loading) {
    return <div>loading..</div>;
  }
  return (
    <>
      <AppBar />
      <div className="flex justify-center">
        <div className="">
          <div className=" flex flex-col justify-center">
            {blogs.map((blog) => (
              <BlogCard
                id={blog.id}
                author={blog.author.name}
                title={blog.title}
                content={blog.content}
                published="16th Feb 2025"
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
