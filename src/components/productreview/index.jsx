import { Button } from "components";
import { memo, useState } from "react";
import { Link } from "react-router-dom";
import { VndFormat } from "ultils/format";
import slugify from "slugify";
function ProductReview({ img, title, id, price, css }) {
  const [image, setImage] = useState(0);
  return (
    <Link
      to={`/${slugify(title, {
        lower: true, // Chuyển đổi thành chữ thường
        strict: true, // Loại bỏ các ký tự không hợp lệ, chỉ giữ lại các ký tự an toàn trong URL
      })}/${id}`}
      onMouseEnter={() => setImage(1)}
      onMouseLeave={() => setImage(0)}
      className={` ${css}  h-[380px] flex items-center cursor-pointer bg-white `}
    >
      <img src={img[image]} className="w-[50%] h-full" alt="ảnh sản phẩm" />
      <section className="p-2 flex flex-col bg-white w-[50%]  justify-between gap-3 items-center">
        <h2 className=" w-full text-center text-md">{title}</h2>
        <span className="text-red-600">{VndFormat(price)}</span>
        <Button
          text={"Thêm vào giỏ hàng"}
          textColor={"text-red-900"}
          border={"border border-red-900"}
          pd={"py-1 px-3"}
          hover={"hover:bg-red-900 hover:text-white"}
        />
      </section>
    </Link>
  );
}

export default memo(ProductReview);
