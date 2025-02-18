import { Blogs } from "../hooks";
import { Avatar } from "./BlogCard";

export const FullBlog = ({ blog }: { blog: Blogs }) => {
  return (
    <>
      <div key={blog.id} className="flex px-10 gap-3">
        <div className="max-w-xl">
          <h1 className="font-bold text-3xl mb-1">{blog.title}</h1>
          <p className="text-xs font-light mb-3">Posted August 24, 2023</p>
          <p className="text-sm">{blog.content}</p>
        </div>
        <div className="max-w-xs">
          <p className="text-sm font-semibold ">Author</p>
          <div className="flex items-center">
            <div className="pb-4 mr-1">
              <Avatar name="Ankit" />
            </div>
            <div>
              <p className="font-bold text-lg">{blog.author.name}</p>
              <p className="text-sm text-gray-500 ">
                Master of mirth, purveyor of puns, and the funniest person in
                the kingdom.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
