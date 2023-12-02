import { getNews } from "api/blog";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Blog() {
  const [blogs, setBlogs] = useState([]);
  const fetch = async (params) => {
    try {
      const rs = await getNews(params);
      if (rs.data.success) {
        setBlogs(rs.data?.news);
      }
    } catch (error) {}
  };
  useEffect(() => {
    fetch({ limit: 8 });
  }, []);
  console.log(blogs);
  return (
    <div className="flex flex-col gap-4">
      {blogs?.map((item) => (
        <Link
          to={`/blog/${item?._id}`}
          key={item?._id}
          className="flex cursor-pointer hover:scale-105 hover:border gap-2 h-[160px] border-b-2 pb-2 w-[80%]"
        >
          <img src={item?.images[0]} alt="" className="w-[30%] h-full" />
          <div className="w-[68%]">
            <h2>{item?.title}</h2>
            <h2 className="w-full line-clamp-3 text-sm text-gray-600 mt-2">
              {item?.description}
            </h2>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Blog;
