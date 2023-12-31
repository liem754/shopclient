import { Button } from "components";
import { memo, useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { VndFormat } from "ultils/format";
import slugify from "slugify";
import { useDispatch, useSelector } from "react-redux";
import { getCurrent, updateCartt } from "store/user/asyncActions";
import Swal from "sweetalert2";
import { deleteCart, updateCart } from "api";
function ItemProduct({ img, title, id, price, css }) {
  const [image, setImage] = useState(0);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { data, isLogginned } = useSelector((state) => state.user);

  const handle = useCallback(async () => {
    if (isLogginned) {
      setLoading(true);

      const rs = await updateCart({
        pid: id,
        title,
        price,
        quantity: 1,
        thumb: img[0],
        color: "đen",
        size: "M",
      });
      if (rs?.data?.err === 0) {
        setLoading(false);
        Swal.fire("Thông báo !", rs?.data?.mes, "success").then(() => {
          dispatch(getCurrent());
        });
      }
    } else {
      Swal.fire("Thông báo !", "Vui lòng đăng nhập !", "info");
    }
  }, [id]);
  const handleDelete = async () => {
    const rs = await deleteCart({ pid: id });
    if (rs.data.err === 0) {
      Swal.fire("Thông báo !", rs?.data?.mes, "success").then(() => {
        dispatch(getCurrent());
      });
    }
  };
  return (
    <div className="flex flex-col items-center shadow-lg pb-4">
      <Link
        to={`/${slugify(title, {
          lower: true, // Chuyển đổi thành chữ thường
          strict: true, // Loại bỏ các ký tự không hợp lệ, chỉ giữ lại các ký tự an toàn trong URL
        })}/${id}`}
        onMouseEnter={() => setImage(1)}
        onMouseLeave={() => setImage(0)}
        className={` ${css} flex flex-col items-center `}
      >
        <img src={img[image]} className="w-full h-[330px]" alt="ảnh sản phẩm" />
        <section className="p-2 flex flex-col h-[90px] justify-between items-center">
          <h2 className=" w-full text-center text-md line-clamp-2 ">{title}</h2>
          <span className="text-red-600">{VndFormat(price)}</span>
        </section>
      </Link>

      {loading ? (
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
        <>
          {data?.cart?.some((item) => item?.product.toString() === id) ? (
            <div className="flex items-center  justify-around w-full">
              <Link
                to={"/user/cart"}
                className="py-1 px-3 md:px-2 md:text-sm bg-gray-200 hover:scale-[1.02]"
              >
                Đã thêm vào giỏ
              </Link>
              <h2
                onClick={handleDelete}
                className="py-1 px-3 md:px-2 md:text-sm bg-red-600 text-white rounded-md cursor-pointer hover:scale-105"
              >
                Xóa
              </h2>
            </div>
          ) : (
            <Button
              Click={handle}
              text={"Thêm vào giỏ hàng"}
              textColor={"text-red-900"}
              border={"border border-red-900"}
              pd={"py-1 px-3 md:text-sm "}
              hover={"hover:bg-red-900 hover:text-white"}
            />
          )}
        </>
      )}
    </div>
  );
}

export default memo(ItemProduct);
