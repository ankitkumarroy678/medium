import { FullBlog } from "../components/FullBlog";
import { useBlog } from "../hooks";
import { useParams } from "react-router-dom";

export const Blog = () => {
  const { id } = useParams();
  console.log(id);
  const { loading, blog } = useBlog({
    id: id || "",
  });
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex justify-center pt-20">
      <FullBlog blog={blog} />
    </div>
  );
};
