import { getNews } from "api/blog";
import { Button } from "components";
import { useCallback, useEffect, useState } from "react";
import {
  Link,
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Icons } from "ultils/icon";
const { FaSearch } = Icons;
function SideBarBlog() {
  const location = useLocation();
  const [param] = useSearchParams();
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [searchs, setSearchs] = useState(false);

  const navigate = useNavigate();
  const fetch = async (params) => {
    try {
      const rs = await getNews(params);
      if (rs.data.success) {
        setBlogs(rs.data?.news);
      }
    } catch (error) {}
  };
  useEffect(() => {
    const query = {};
    for (let i of param) query[i[0]] = i[1];
    fetch({ limit: 8, ...query });
  }, [param]);

  const handle = useCallback(() => {
    const query = Object.fromEntries([...param]);
    if (search !== "") {
      query.q = search;
    }
    if (search === "") {
      delete query.q;
    }
    navigate({
      pathname: "/blog",
      search: createSearchParams(query).toString(),
    });
  }, [search]);
  return (
    <div className="flex flex-col gap-3 p-3">
      <section className="border border-black flex justify-between items-center">
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          className="p-2 w-[80%] "
        />
        <Button
          Click={handle}
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
        <Link
          to={`/blog`}
          className="flex gap-2  border-b-2 pb-2  text-sm hover:underline hover:underline-offset-2 hover:text-red-500 cursor-pointer"
        >
          <h2>Tất cả</h2>
        </Link>
      </div>
    </div>
  );
}

export default SideBarBlog;
