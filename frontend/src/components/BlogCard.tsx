import { Link } from "react-router-dom";

interface BlogInput {
  id: string;
  author: string;
  title: string;
  content: string;
  published: string;
}

export const BlogCard = ({
  id,
  author,
  title,
  content,
  published,
}: BlogInput) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className="min-w-[500px] cursor-pointer w-full p-2">
        <div className="flex items-center space-x-1 pb-1">
          <Avatar name={author} />
          <div className="flex items-center pb-1 space-x-1 text-sm">
            <div>{author}</div>
            <div className="flex ">
              <span className=" text-gray-500 text-[4px] pt-1">&#9679;</span>
            </div>
            <div className="items-center text-xs pt-1">{published}</div>
          </div>
        </div>
        <div className="text-sm font-bold">{title}</div>
        <div className="font-serif text-xs text-gray-800">{content}</div>
        <div className="text-[11px] pt-4 font-medium text-gray-500">{`${Math.ceil(
          content.length / 100
        )} minutes`}</div>
        <div className="h-px my-4 border-0 dark:bg-gray-500"></div>
      </div>
    </Link>
  );
};

export function Avatar({ name }: { name: string }) {
  return (
    <>
      <div className="relative inline-flex justify-center w-5 h-5  overflow-hidden bg-gray-100 pt-[1px] rounded-full dark:bg-gray-600 mr-1">
        <span className="font-semibold  text-gray-600 text-[10px] dark:text-gray-300">
          {name.slice(0, 2)}
        </span>
      </div>
    </>
  );
}
