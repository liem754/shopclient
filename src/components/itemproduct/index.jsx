import { Button } from "components";
import { memo, useState } from "react";
import { Link } from "react-router-dom";
import { VndFormat } from "ultils/format";
import slugify from "slugify";
function ItemProduct({ img, title, id, price, css }) {
  const [image, setImage] = useState(0);
  return (
    <Link
      to={`/${slugify(title, {
        lower: true, // Chuyển đổi thành chữ thường
        strict: true, // Loại bỏ các ký tự không hợp lệ, chỉ giữ lại các ký tự an toàn trong URL
      })}/${id}`}
      onMouseEnter={() => setImage(1)}
      onMouseLeave={() => setImage(0)}
      className={` ${css} flex flex-col items-center `}
    >
      <img src={img[image]} className="w-full" alt="ảnh sản phẩm" />
      <section className="p-2 flex flex-col h-[80px] justify-between items-center">
        <h2 className=" w-full text-center text-md">{title}</h2>
        <span className="text-red-600">{VndFormat(price)}</span>
      </section>
      <Button
        text={"Thêm vào giỏ hàng"}
        textColor={"text-red-900"}
        border={"border border-red-900"}
        pd={"py-1 px-3"}
        hover={"hover:bg-red-900 hover:text-white"}
      />
    </Link>
  );
}

export default memo(ItemProduct);
