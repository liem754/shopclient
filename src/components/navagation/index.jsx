import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { getCategory } from "store/product/asyncActions";
import { Icons } from "ultils/icon";
import "./navigation.css";
import { navi } from "ultils/contans";
const {
  IoHomeSharp,
  PiShirtFoldedFill,
  MdContacts,
  MdFiberNew,
  MdPayments,
  FaChevronDown,
  MdOutlinePreview,
} = Icons;

function Navigation() {
  const dispatch = useDispatch();
  const { categorys } = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(getCategory());
  }, []);
  return (
    <div className=" flex justify-center items-center bg-black text-white ">
      <nav className=" w-[75%] flex items-center gap-4 md:text-sm sm:hidden xs:hidden text-md font-medium">
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            isActive
              ? " underline underline-offset-8 flex items-center gap-1 py-3 px-3 text-yellow-400"
              : "items-center gap-1 flex py-3 px-3 hover:bg-gray-600 "
          }
        >
          <IoHomeSharp />
          <span>Trang chủ</span>
        </NavLink>
        <section className="far z-10">
          <div className=" flex hove items-center gap-1 px-3 py-3  cursor-pointer">
            <p>Sản phẩm</p>
            <FaChevronDown className="mt-1" size={"12px"} />
          </div>
          <div className="bg-white child shadow-lg z-10  text-black ">
            {categorys?.map((item) => (
              <Link
                to={`/product/${item?.value}`}
                className="py-2 px-6 border-b hover:underline hover:underline-offset-2 cursor-pointer"
                key={item?._id}
              >
                {item?.value}
              </Link>
            ))}
          </div>
        </section>

        {navi?.map((item, index) => (
          <NavLink
            className={({ isActive }) =>
              isActive
                ? " underline underline-offset-8 flex items-center gap-1 py-2 px-3 text-yellow-400"
                : "items-center gap-1 flex py-3 px-3 hover:bg-gray-600 "
            }
            key={index}
            to={item?.link}
          >
            {item?.icon}
            <span>{item?.value}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

export default memo(Navigation);
