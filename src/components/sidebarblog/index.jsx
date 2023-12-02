import { getNews } from "api/blog";
import { Button } from "components";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Icons } from "ultils/icon";
const { FaSearch } = Icons;
function SideBarBlog() {
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
  return (
    <div className="flex flex-col gap-3 p-3">
      <section className="border border-black flex justify-between items-center">
        <input type="text" className="p-2 w-[80%] " />
        <Button
          text={<FaSearch />}
          textColor={"text-white"}
          bgColor={"bg-red-800"}
          pd={"py-3 w-[20%]"}
          textCenter={" flex justify-center items-center"}
        />
      </section>
      <div className=" mt-6">
        {blogs?.map((item) => (
          <Link
            to={`/blog/${item?._id}`}
            key={item?._id}
            className="flex gap-2  border-b-2 pb-2  text-sm hover:underline hover:underline-offset-2 hover:text-red-500 cursor-pointer"
          >
            <h2>{item?.title}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SideBarBlog;
