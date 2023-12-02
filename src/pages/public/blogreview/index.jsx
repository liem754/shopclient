import { getNewOne } from "api/blog";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

function BlogReview() {
  const param = useParams();
  const [blogs, setBlogs] = useState(null);
  const fetch = async (param) => {
    try {
      const rs = await getNewOne(param);
      if (rs.data.err === 0) {
        setBlogs(rs.data?.new);
      }
    } catch (error) {}
  };
  useEffect(() => {
    fetch(param?.id);
  }, [param]);

  return (
    <div className=" flex flex-col items-center gap-4">
      <h2 className="text-xl text-center font-semibold">{blogs?.title}</h2>
      <section className="flex flex-col items-center">
        <img src={blogs?.images[0]} alt="" className="w-[90%] text-center" />
        <p className="text-sm w-[90%] mt-2 text-left text-gray-600">
          {`Ngày đăng: ${blogs?.createdAt.slice(0, 10)}`}
        </p>
      </section>
      <section className="flex flex-col items-center">
        {blogs?.description?.split("/n").map((item, index) =>
          blogs?.images?.length > 1 ? (
            blogs?.images.slice(1)?.map((el) => (
              <div className="flex flex-col gap-2">
                <h2 key={index}>{item}</h2>
                <img src={el} alt="" />
              </div>
            ))
          ) : (
            <h2 className="mb-2" key={index}>
              {item}
            </h2>
          )
        )}
      </section>
    </div>
  );
}

export default BlogReview;
