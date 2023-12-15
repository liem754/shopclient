import { useDispatch, useSelector } from "react-redux";
import { VndFormat } from "ultils/format";
import im from "../../../access/logo.png";
import { useEffect, useState } from "react";
import Paypal from "common/paypal";
import { createOrder } from "api";
import Swal from "sweetalert2";
import { getCurrent } from "store/user/asyncActions";
import { useNavigate } from "react-router-dom";
function Pay() {
  const { data } = useSelector((state) => state.user);
  const [tran, setTran] = useState(15000);
  const [iss, setIss] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [payload, setPayload] = useState({
    address: data?.address,
  });
  const handleSave = async (final) => {
    setIsSuccess(false);
    const rs = await createOrder({ ...final });
    if (rs.data?.err === 0) {
      Swal.fire("Chúc mừng", rs.data?.mes, "success").then(() => {
        dispatch(getCurrent());

        navigate("/user/history");
      });
    }
  };
  useEffect(() => {
    if (payload?.address !== "") {
      isSuccess &&
        handleSave({
          cart: data?.cart,
          total: Math.round(
            +data?.cart?.reduce((sum, item) => +item.price + sum, 0)
          ),
          address: payload?.address,
          pay: iss ? "Thanh toán Online" : "Thanh toán khi nhận hàng",
          transpost:
            tran === 15000
              ? "Vận chuyển thường VNPost Tiết Kiệm"
              : tran === 30000
              ? "Vận chuyển nhanh J&T Express"
              : "Vận chuyển hỏa tốc SPX Instant",
        });
    } else {
      Swal.fire("Thông báo !", "Vui lòng điền địa chỉ giao hàng !");
    }
  }, [isSuccess]);
  return (
    <div className="h-auto flex justify-center items-center pb-10 pt-2">
      <div className="w-[98%] flex flex-col items-center justify-center gap-2">
        <div className="w-[35%] flex flex-col ">
          <img src={im} alt="" className="w-full h-[50%]" />
        </div>
        <div className="w-[64%] p-2 flex flex-col items-center gap-8 mt-2">
          <div className=" flex justify-center">
            <h2 className="text-2xl font-bold">CHECKOUT YOUR CART</h2>
          </div>
          <div className="w-full">
            <table className=" table-auto w-full">
              <thead className="border bg-gray-400">
                <tr>
                  <th className="text-center p-2 text-medium border border-black">
                    Thumb
                  </th>
                  <th className="text-center p-2 text-medium border border-black">
                    Product
                  </th>
                  <th className="text-center p-2 text-medium border border-black">
                    quantity
                  </th>

                  <th className="text-center p-2 text-medium border border-black">
                    price
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.cart?.map((el) => (
                  <tr>
                    <td className="border p-2 text-center border-black">
                      <img src={el.thumb} alt="" className="w-[50px]" />
                    </td>
                    <td className="border p-2 text-center border-black">
                      {el.title}
                    </td>
                    <td className="border p-2 text-center border-black">
                      {el.quantity}
                    </td>

                    <td className="border p-2 text-center border-black">
                      {VndFormat(el.price)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col gap-2 py-2 border-b-2">
            <h2 className=" text-center font-bold text-2xl mb-2">
              Phương thức vận chuyển
            </h2>
            <div className="flex items-center gap-2 font-medium">
              <input
                type="checkbox"
                checked={tran === 15000}
                onChange={() => setTran(15000)}
              />
              <h2>Vận chuyển thường VNPost Tiết Kiệm (15000 đ)</h2>
            </div>
            <div className="flex items-center gap-2 font-medium">
              <input
                type="checkbox"
                checked={tran === 30000}
                onChange={() => setTran(30000)}
              />
              <h2>Vận chuyển nhanh J&T Express (30000 đ)</h2>
            </div>
            <div className="flex items-center gap-2 font-medium">
              <input
                type="checkbox"
                checked={tran === 40000}
                onChange={() => setTran(40000)}
              />
              <h2>Vận chuyển hỏa tốc SPX Instant (40000 đ)</h2>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-center font-medium text-2xl mb-2">
              Thành tiền
            </h2>
            <div className="flex items-center justify-end gap-2">
              <h3>Phí vận chuyển :</h3>
              <h3 className=" text-red-600">{VndFormat(tran)}</h3>
            </div>
            <div className="flex items-center justify-end gap-2">
              <h3>Tiền sản phẩm :</h3>
              <h3 className=" text-red-600">
                {VndFormat(
                  data?.cart?.reduce((sum, item) => +item.price + sum, 0)
                )}
              </h3>
            </div>
            <div className="flex items-center justify-end gap-2">
              <h3>Total:</h3>
              <h3 className=" text-red-600">
                {VndFormat(
                  data?.cart?.reduce((sum, item) => +item.price + sum, 0) + tran
                )}
              </h3>
            </div>
          </div>
          <div className=" w-[80%] mt-4">
            <div className=" flex items-center gap-2 mb-2 font-medium">
              <h2 className=" text-left">Địa chỉ :</h2>
              <h2 className="text-sm">
                ( Vui lòng nhập địa chỉ trước khi thanh toán ! ){" "}
              </h2>
            </div>
            <input
              type="text"
              placeholder="Nhập địa chỉ để đặt hàng !"
              className=" p-2 rounded-md border-2 w-full"
              value={payload?.address}
              onChange={(e) =>
                setPayload((pre) => ({
                  ...pre,
                  address: e.target.value,
                }))
              }
            />
          </div>
          <div className="flex flex-col w-full  gap-2">
            <h2>Chọn hình thức thanh toán : </h2>
            <h2
              onClick={() => setIss(false)}
              className={`text-lg cursor-pointer hover:bg-gray-200 py-1 text-center px-3 font-medium ${
                !iss ? "bg-black text-white" : ""
              }`}
            >
              Thanh toán khi nhận hàng
            </h2>
            <h2
              onClick={() => setIss(true)}
              className={`text-lg py-1 text-center hover:bg-gray-200 cursor-pointer px-3 font-medium ${
                iss ? "bg-black text-white" : ""
              }`}
            >
              Thanh toán online
            </h2>
          </div>
          {/* <div className=" w-[70%]"> */}
          <div className="border-t-2 w-full flex justify-center pt-7">
            {iss ? (
              <Paypal
                setIsSuccess={setIsSuccess}
                amount={Math.round(
                  +data?.cart?.reduce((sum, item) => +item.price + sum, 0) /
                    23500
                )}
              />
            ) : (
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => setIsSuccess(true)}
                  className="py-2 px-8 rounded-md hover:scale-105 bg-blue-600 text-white textlg"
                >
                  Đặt hàng
                </button>
                <h2>Bạn Muốn thay đổi sản phẩm ?</h2>
                <button
                  onClick={() => navigate("/user/cart")}
                  className="py-2 px-8 rounded-md hover:scale-105 bg-gray-600 text-white textlg"
                >
                  Về giỏ hàng
                </button>
              </div>
            )}
          </div>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}

export default Pay;
