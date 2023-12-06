import { getProductNext, updateCart } from "api";
import { Button, Header, ModelRating, Slider, Tab } from "components";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProductbyId, getProductss } from "store/product/asyncActions";
import slugify from "slugify";
import { VndFormat } from "ultils/format";
import { updateRating } from "store/product/productSlice";
import SliderProduct from "components/sliderproduct";
import { Icons } from "ultils/icon";
import Swal from "sweetalert2";
import { getCurrent, updateCartt } from "store/user/asyncActions";
const { IoIosArrowDropright } = Icons;
function ProductDetail() {
  const param = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { productData, rating, products, isLoading } = useSelector(
    (state) => state.product
  );
  const [active, setActives] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("đen");

  const [size, setSize] = useState("M");

  const [activee, setActivee] = useState(productData?.images[0]);
  const { mes } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getProductbyId(param?.pid));
    dispatch(getProductss({ category: productData?.category, limit: 6 }));
    dispatch(updateRating(false));
    setQuantity(1);
    const t = setTimeout(() => {
      setActivee(0);
    }, 1000);
    setActives("");

    return () => {
      clearTimeout(t);
    };
  }, [param?.pid, rating]);
  const handle = useCallback(async () => {
    setActives("");
    const rs = await getProductNext(productData?._id);
    if (rs.data.err === 0) {
      navigate(
        `/${slugify(rs?.data?.productData?.title, {
          lower: true, // Chuyển đổi thành chữ thường
          strict: true, // Loại bỏ các ký tự không hợp lệ, chỉ giữ lại các ký tự an toàn trong URL
        })}/${rs?.data?.productData?._id}`
      );
    } else {
      Swal.fire("Thông báo !", "Sản phẩm cuối rồi !", "info");
    }
  }, [productData?._id]);
  const handleUpdate = async () => {
    const rs = await updateCart({
      pid: productData?._id,
      title: productData?.title,
      price: productData?.price * quantity,
      quantity: quantity,
      thumb: productData?.images[0],
      color: color,
      size: size,
    });
    if (rs?.data?.err === 0) {
      Swal.fire("Thông báo !", rs?.data?.mes, "success").then(() => {
        dispatch(getCurrent());
      });
    }
  };
  return (
    <div className="flex flex-col justify-center items-center my-12">
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
        <div className="w-4/5 md:w-[85%] flex flex-row sm:flex-col xs:flex-col gap-6">
          <section className="flex w-[50%] sm:w-[98%] xs:w-[98%] gap-3">
            <div className="flex flex-col gap-2 w-[20%]">
              {productData?.images?.map((item, index) => (
                <img
                  key={index}
                  src={item}
                  alt=""
                  className={`${
                    activee !== index
                      ? "brightness-50 hover:brightness-100"
                      : ""
                  } w-full cursor-pointer`}
                  onClick={() => {
                    setActives(item);

                    setActivee(index);
                  }}
                />
              ))}
            </div>
            <div className="w-[78%]">
              <Slider list={productData?.images} auto active={active} />
            </div>
          </section>
          <section className="flex  gap-4 justify-between w-[50%] sm:w-[98%] xs:w-[98%] ">
            <div className="flex flex-col gap-4 w-full ">
              <h2 className=" text-2xl font-medium">{productData?.title}</h2>
              <div className=" border-2 border-gray-600 w-[40px]"></div>
              <h2 className=" text-red-600 text-2xl font-medium">
                {VndFormat(productData?.price * quantity)}
              </h2>

              <div className="flex flex-col gap-3 w-full">
                <h2>Màu:</h2>
                <div className=" flex items-center gap-8 w-full ">
                  <h2
                    onClick={() => setColor("đen")}
                    className={`py-3 bg-black ${
                      color === "đen"
                        ? "scale-[1.1] border-double border-4 border-indigo-600"
                        : "hover:scale-105"
                    }   text-white  text-center px-3 cursor-pointer rounded-[50%] `}
                  >
                    đen
                  </h2>
                  <h2
                    onClick={() => setColor("trắng")}
                    className={`${
                      color === "trắng"
                        ? "scale-[1.1] border-double border-4 border-indigo-600"
                        : "hover:scale-105"
                    } py-3 bg-white border px-2  text-center cursor-pointer border-black rounded-[50%] `}
                  >
                    trắng
                  </h2>
                  <h2
                    onClick={() => setColor("xanh")}
                    className={`${
                      color === "xanh"
                        ? "scale-[1.1] border-double border-4 border-indigo-600"
                        : "hover:scale-105"
                    } py-3 bg-green-700 text-white px-2 text-center cursor-pointer rounded-[50%]`}
                  >
                    xanh
                  </h2>
                </div>
              </div>
              <div className="flex flex-col gap-3 w-full">
                <h2>Size:</h2>
                <div className=" flex items-center gap-8 w-full ">
                  <h2
                    onClick={() => setSize("M")}
                    className={`py-2 ${
                      size === "M"
                        ? "scale-[1.1]  border-2 border-indigo-600"
                        : "hover:scale-105"
                    }  sc  w-[12%] md:w-[16%] text-center cursor-pointer border border-black `}
                  >
                    M
                  </h2>
                  <h2
                    onClick={() => setSize("L")}
                    className={`${
                      size === "L"
                        ? "scale-[1.1]  border-2 border-indigo-600"
                        : "hover:scale-105"
                    } py-2  border w-[12%] md:w-[16%] text-center cursor-pointer border-black  `}
                  >
                    L
                  </h2>
                  <h2
                    onClick={() => setSize("XL")}
                    className={`${
                      size === "XL"
                        ? "scale-[1.1]  border-2 border-indigo-600"
                        : "hover:scale-105"
                    } py-2   w-[12%] md:w-[16%] text-center cursor-pointer border border-black `}
                  >
                    XL
                  </h2>
                </div>
                <h2>Số lượng:</h2>
                <div className="flex  ">
                  <h2
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                    className="py-2 px-4 border border-black cursor-pointer bg-gray-100 hover:bg-gray-200"
                  >
                    -
                  </h2>
                  <h2 className="py-2 px-5 border-y-2">{quantity}</h2>
                  <h2
                    onClick={() => setQuantity(quantity + 1)}
                    className="py-2 px-4 border border-black cursor-pointer bg-gray-100 hover:bg-gray-200"
                  >
                    +
                  </h2>
                </div>
              </div>
              <Button
                Click={handleUpdate}
                text={"Thêm vào giỏ"}
                textColor={"text-white"}
                bgColor={"bg-red-600"}
                radius={"rounded-md"}
                full
                pd={"py-2 mt-10"}
              />
            </div>
            <div className="flex justify-start items-start">
              <button onClick={handle} className=" hover:bg-gray-300">
                <IoIosArrowDropright size={"40px"} />
              </button>
            </div>
          </section>
        </div>
      )}
      <div className="w-4/5 my-14">
        <Tab
          list={[
            {
              key: "1",
              label: "Mô tả",
              children: productData?.description
                ?.split("/n")
                .map((item, index) => (
                  <h2 key={index} className="mb-2">
                    {item}
                  </h2>
                )),
            },
            {
              key: "2",
              label: "Đánh giá",
              children: (
                <ModelRating
                  totalratings={productData?.totalRatings}
                  total={productData?.ratings}
                  pid={productData?._id}
                />
              ),
            },
          ]}
        />
      </div>
      <div className="w-4/5 md:w-[85%] my-14">
        <h2 className=" font-medium text-2xl py-3 border-b-2">
          SẢN PHẨM TƯƠNG TỰ
        </h2>
        <div className="mt-5 md:hidden sm:hidden xs:hidden">
          <SliderProduct list={products?.products} d />
        </div>
        <div className="mt-5 lg:hidden xl:hidden 2xl:hidden sm:hidden xs:hidden">
          <SliderProduct list={products?.products} md d />
        </div>
        <div className="mt-5 lg:hidden xl:hidden 2xl:hidden md:hidden">
          <SliderProduct list={products?.products} d sm md />
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
