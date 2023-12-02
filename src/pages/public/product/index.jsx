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
  const { products } = useSelector((state) => state.product);

  useEffect(() => {
    let queris = {};
    for (let i of params) queris[i[0]] = i[1];

    const q = { ...queris, category: formatCode(param?.category), limit: 2 };
    console.log(q);
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
      <div className="flex justify-between items-center mb-4 border p-3">
        <select
          name=""
          id=""
          className=" cursor-pointer py-1 border-2 rounded-sm w-[20%]"
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
      <div className="flex flex-wrap gap-4 mb-10">
        {products?.products?.map((item) => (
          <div key={item?._id} className="w-[30%]">
            <ItemProduct
              id={item?._id}
              img={item?.images}
              title={item?.title}
              price={item?.price}
            />
          </div>
        ))}
      </div>

      <Pagination totalCount={products?.counts} pageSize={products?.limit} />
    </div>
  );
}

export default ProductCT;
