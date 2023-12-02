import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

function SidebarProduct() {
  const { categorys } = useSelector((state) => state.product);
  console.log(categorys);
  return (
    <div className="p-4">
      <h2 className=" pb-2 border-b font-semibold">DANH MỤC SẢN PHẨM</h2>
      <div className="flex flex-col  text-black ">
        {categorys?.map((item) => (
          <NavLink
            to={`/product/${item?.value}`}
            className={({ isActive }) =>
              isActive
                ? "py-2 border-b underline underline-offset-2 text-red-600"
                : "py-2 border-b hover:underline hover:underline-offset-2 cursor-pointer"
            }
            key={item?._id}
          >
            {item?.value}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default SidebarProduct;
