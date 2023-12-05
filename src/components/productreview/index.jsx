import { Button } from "components";
import { memo, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { VndFormat } from "ultils/format";
import slugify from "slugify";
import Swal from "sweetalert2";
import { deleteCart, updateCart } from "api";
import { useDispatch, useSelector } from "react-redux";
import { getCurrent } from "store/user/asyncActions";
function ProductReview({ img, title, id, price, css }) {
  const [image, setImage] = useState(0);
  const dispatch = useDispatch();
  const { data, isLogginned } = useSelector((state) => state.user);

  const handle = useCallback(async () => {
    if (isLogginned) {
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
    <div
      onMouseEnter={() => setImage(1)}
      onMouseLeave={() => setImage(0)}
      className={` ${css}  h-[380px] flex items-center cursor-pointer bg-white `}
    >
      <Link
        to={`/${slugify(title, {
          lower: true, // Chuyển đổi thành chữ thường
          strict: true, // Loại bỏ các ký tự không hợp lệ, chỉ giữ lại các ký tự an toàn trong URL
        })}/${id}`}
        className="w-[50%]"
      >
        <img src={img[image]} className="w-full h-full" alt="ảnh sản phẩm" />
      </Link>
      <section className="p-2 flex flex-col bg-white w-[50%]  justify-between gap-3 items-center">
        <h2 className=" w-full text-center text-md">{title}</h2>
        <span className="text-red-600">{VndFormat(price)}</span>
        {data?.cart?.some((item) => item?.product.toString() === id) ? (
          <div className="flex items-center justify-around w-full">
            <h2 className="py-1 px-3 bg-gray-200">Đã thêm vào giỏ</h2>
            <h2
              onClick={handleDelete}
              className="py-1 px-3 bg-red-600 text-white rounded-md cursor-pointer hover:scale-105"
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
            pd={"py-1 px-3"}
            hover={"hover:bg-red-900 hover:text-white"}
          />
        )}
      </section>
    </div>
  );
}

export default memo(ProductReview);
