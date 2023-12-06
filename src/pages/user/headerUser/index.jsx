import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { path } from "ultils/path";
const list = [
  {
    id: 1,
    value: "Thông Tin Tài Khoản",
    link: `${path?.INFORMATION}`,
  },
  {
    id: 2,
    value: "Giỏ Hàng",
    link: "/user/cart",
  },
  {
    id: 3,
    value: "Lịch Sử Mua Hàng",
    link: "/user/history",
  },
  {
    id: 4,
    value: "Trang Chủ",
    link: "/",
  },
];
function HeaderUser() {
  const { data } = useSelector((state) => state.user);

  return (
    <div className="flex gap-10 bg-black text-white justify-center text-sm items-center py-1">
      <section className="flex items-center gap-4">
        <img
          src={data?.avatar}
          alt=""
          className="w-[50px] h-[50px] rounded-[50%] border border-white"
        />
        <h2 className="text-sm font-medium">{data?.name}</h2>
      </section>
      <section className=" flex gap-10 ">
        {list?.map((item) => (
          <NavLink
            key={item?.id}
            to={item?.link}
            className={({ isActive }) =>
              isActive
                ? "text-sm font-medium text-red-600 py-3 "
                : "py-3 hover:text-red-600 text-sm font-medium"
            }
          >
            {item?.value}
          </NavLink>
        ))}
      </section>
    </div>
  );
}

export default HeaderUser;
