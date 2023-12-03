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
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.user);

  const handle = useCallback(async () => {
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
    </div>
  );
}

export default memo(ItemProduct);
