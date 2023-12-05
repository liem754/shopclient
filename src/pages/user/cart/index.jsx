import { deleteCart, getProduct, updateCart } from "api";
import { Button } from "components";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProductbyId } from "store/product/asyncActions";
import { getCurrent } from "store/user/asyncActions";
import Swal from "sweetalert2";
import { VndFormat } from "ultils/format";
import { Icons } from "ultils/icon";

const { TfiFaceSad } = Icons;
function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [indexx, setIndexx] = useState("");

  const { data } = useSelector((state) => state.user);
  const { productData } = useSelector((state) => state.product);

  const [quantity, setQuantity] = useState(0);
  const handleDelete = async (id) => {
    setIndexx(id);
    setLoading(true);
    const rs = await deleteCart({ pid: id });
    if (rs.data.err === 0) {
      setLoading(false);
      Swal.fire("Thông báo !", rs?.data?.mes, "success").then(() => {
        dispatch(getCurrent());
      });
    }
  };
  const handleAdd = async (id, title, quantity, img, color, size) => {
    const rss = await getProduct(id);

    if (rss?.data?.err === 0) {
      const rs = await updateCart({
        pid: id,
        title,
        price: rss.data.productData?.price * (quantity + 1),
        quantity: quantity + 1,
        thumb: img,
        color,
        size,
      });
      if (rs?.data?.err === 0) {
        Swal.fire("Thông báo !", rs?.data?.mes, "success").then(() => {
          dispatch(getCurrent());
          setQuantity(0);
        });
      }
    }
  };

  const handleRedu = async (id, title, quantity, img, color, size) => {
    const rss = await getProduct(id);

    if (rss?.data?.err === 0) {
      const rs = await updateCart({
        pid: id,
        title,
        price: rss.data.productData?.price * (quantity - 1),
        quantity: quantity - 1,
        thumb: img,
        color,
        size,
      });
      if (rs?.data?.err === 0) {
        Swal.fire("Thông báo !", rs?.data?.mes, "success").then(() => {
          dispatch(getCurrent());
        });
      }
    }
  };

  console.log(data?.cart);
  return (
    <div className="flex flex-col gap-10 p-8 justify-center items-center">
      <h2 className=" text-3xl font-bold  text-center">Giỏ Hàng</h2>

      {data?.cart?.length > 0 ? (
        data?.cart?.map((item, index) => (
          <div className="flex gap-2 w-[80%] border-2 shadow-lg">
            <img
              src={item?.thumb}
              alt=""
              className="w-[30%] h-[250px] bg-cover"
            />
            <div className="flex flex-col gap-2 p-3 w-[69%] justify-between">
              <div className="flex flex-col gap-4">
                <section>
                  <h2 className="text-lg font-bold">{item?.title}</h2>
                </section>
                <div className=" flex items-center justify-between">
                  <div className="flex flex-col gap-2">
                    <section className=" flex items-center gap-2">
                      <h3 className=" font-medium">Giá:</h3>
                      <h2>{VndFormat(item?.price)}</h2>
                    </section>

                    <section className=" flex items-center gap-2">
                      <h3 className=" font-medium">Màu:</h3>
                      <h2>{item?.color}</h2>
                    </section>
                  </div>
                  <div className="flex flex-col gap-2">
                    <section className=" flex items-center gap-2">
                      <h3 className=" font-medium">Size:</h3>
                      <h2>{item?.size}</h2>
                    </section>
                    <section className=" flex items-center gap-2">
                      <h3 className=" font-medium">Số Lượng:</h3>
                      <div className="flex  ">
                        <h2
                          onClick={() => {
                            item?.quantity > 1 &&
                              handleRedu(
                                item?.product,
                                item?.title,
                                item?.quantity,
                                item?.thumb,
                                item?.color,
                                item?.size
                              );
                          }}
                          className="py-2 px-4 border border-black cursor-pointer bg-gray-100 hover:bg-gray-200"
                        >
                          -
                        </h2>
                        <h2 className="py-2 px-5 border-y-2">
                          {item?.quantity}
                        </h2>
                        <h2
                          onClick={() => {
                            handleAdd(
                              item?.product,
                              item?.title,
                              item?.quantity,
                              item?.thumb,
                              item?.color,
                              item?.size
                            );
                          }}
                          className="py-2 px-4 border border-black cursor-pointer bg-gray-100 hover:bg-gray-200"
                        >
                          +
                        </h2>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between w-full">
                {loading && indexx === item?.product ? (
                  <div
                    role="status"
                    className="w-full bg-red-600 py-1 rounded-md flex flex-col justify-center items-center"
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
                  <Button
                    Click={() => handleDelete(item?.product)}
                    text={"Xóa"}
                    textColor={"text-white"}
                    bgColor={"bg-red-600"}
                    round={"rounded-md hover:scale-[1.02]"}
                    pd={"py-2 px-6"}
                    full
                  />
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex flex-col gap-2 items-center mt-8">
          <TfiFaceSad size={"60px"} />

          <h2 className=" text-lg">
            Chưa có sản phẩm nào trong giỏ hàng ! Vui lòng thêm vào giỏ ?
          </h2>
          <h2
            onClick={() => {
              navigate("/");
            }}
            className="py-1 px-3 bg-blue-600 text-white rounded-md cursor-pointer hover:scale-105"
          >
            Đi đến sản phẩm
          </h2>
        </div>
      )}

      {data?.cart?.length > 0 && (
        <div className="flex justify-center w-full">
          <h2
            onClick={() => {
              navigate("/pay");
            }}
            className="py-2 px-16 bg-blue-600  text-white rounded-md cursor-pointer hover:scale-105"
          >
            Đặt hàng
          </h2>
        </div>
      )}
    </div>
  );
}

export default Cart;
