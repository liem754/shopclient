import { Button, ItemProduct, Pagination } from "components";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { getProductss } from "store/product/asyncActions";
import { formatCode } from "ultils/format";
import { Icons } from "ultils/icon";
const { FaSearch } = Icons;
function ProductCT() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const param = useParams();
  const [params] = useSearchParams();
  const [color, setColor] = useState("");
  const [search, setSearch] = useState("");
  const location = useLocation();
  const { products, isLoading } = useSelector((state) => state.product);

  useEffect(() => {
    let queris = {};
    for (let i of params) queris[i[0]] = i[1];

    const q = { ...queris, category: formatCode(param?.category), limit: 2 };
    dispatch(getProductss(q));
  }, [params, param]);

  const handleon = (e) => {
    const queries = Object.fromEntries([...params]);
    if (e.target.value !== "" && e.target.value !== "all") {
      queries.color = e.target.value;
    }
    if (e.target.value === "" || e.target.value === "all") {
      delete queries.color;
      delete queries.q;
    }
    queries.page = 1;
    navigate({
      pathname: location.pathname,
      search: createSearchParams(queries).toString(),
    });
  };
  const handle = useCallback(() => {
    const queries = Object.fromEntries([...params]);
    // if (e !== "" && e.target.value !== "all") {
    //   queries.color = e.target.value;
    // }
    if (search === "") {
      delete queries.q;
    }
    queries.q = search;
    queries.page = 1;
    navigate({
      pathname: location.pathname,
      search: createSearchParams(queries).toString(),
    });
  }, [search]);
  console.log(color);
  return (
    <div className="p-4">
      <div className="flex justify-between flex-row xs:flex-col-reverse xs:gap-2 items-center mb-4 border p-3">
        <select
          name=""
          id=""
          className=" cursor-pointer py-1 border-2 rounded-sm w-[20%] sm:w-[30%] xs:w-[80%]"
          onChange={(e) => handleon(e)}
        >
          <option value={""}>Chọn màu</option>

          <option value={"all"}>Tất cả</option>

          <option value={"đen"}>Đen</option>
          <option value={"trắng"}>Trắng</option>
          <option value={"xanh"}>Xanh</option>
        </select>
        <section className="border border-black flex justify-between items-center">
          <input
            type="text"
            className="p-2 w-[80%] "
            onChange={(e) => setSearch(e.target.value)}
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
      </div>
      {isLoading ? (
        <div
          role="status"
          className="w-full flex flex-col justify-center items-center"
        >
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <div className="flex flex-wrap gap-4 mb-10">
          {products?.products?.map((item) => (
            <div
              key={item?._id}
              className="w-[30%] lg:w-[45%] md:w-[45%] sm:w-[45%] xs:w-[98%]"
            >
              <ItemProduct
                id={item?._id}
                img={item?.images}
                title={item?.title}
                price={item?.price}
              />
            </div>
          ))}
        </div>
      )}
      {products?.products?.length !== 0 ? (
        <Pagination totalCount={products?.counts} pageSize={products?.limit} />
      ) : (
        <h2 className="w-full text-center font-medium ">Không có sản phẩm</h2>
      )}
    </div>
  );
}

export default ProductCT;
