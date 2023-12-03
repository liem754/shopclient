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
  const { productData, rating, products } = useSelector(
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
      <div className="w-4/5 flex gap-6">
        <section className="flex w-[50%] gap-3">
          <div className="flex flex-col gap-2 w-[20%]">
            {productData?.images?.map((item, index) => (
              <img
                key={index}
                src={item}
                alt=""
                className={`${
                  activee !== index ? "brightness-50 hover:brightness-100" : ""
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
        <section className="flex  gap-4 justify-between w-[50%] ">
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
                  className={`py-2  ${
                    size === "M"
                      ? "scale-[1.1]  border-2 border-indigo-600"
                      : "hover:scale-105"
                  }  sc  w-[12%] text-center cursor-pointer border border-black `}
                >
                  M
                </h2>
                <h2
                  onClick={() => setSize("L")}
                  className={`${
                    size === "L"
                      ? "scale-[1.1]  border-2 border-indigo-600"
                      : "hover:scale-105"
                  } py-2  border w-[12%] text-center cursor-pointer border-black  `}
                >
                  L
                </h2>
                <h2
                  onClick={() => setSize("XL")}
                  className={`${
                    size === "XL"
                      ? "scale-[1.1]  border-2 border-indigo-600"
                      : "hover:scale-105"
                  } py-2   w-[12%] text-center cursor-pointer border border-black `}
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
      <div className="w-4/5 my-14">
        <h2 className=" font-medium text-2xl py-3 border-b-2">
          SẢN PHẨM TƯƠNG TỰ
        </h2>
        <div className="mt-5">
          <SliderProduct list={products?.products} d />
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
