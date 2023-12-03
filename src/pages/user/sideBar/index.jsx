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
function SideBar() {
  const { data } = useSelector((state) => state.user);
  return (
    <div className="flex flex-col gap-4 py-6 border-r h-screen">
      <section className="flex items-center gap-4 ml-6">
        <img
          src={data?.avatar}
          alt=""
          className="w-[50px] h-[50px] rounded-[50%]"
        />
        <h2 className="text-2xl font-medium">{data?.name}</h2>
      </section>
      <section className=" flex flex-col mt-5">
        {list?.map((item) => (
          <NavLink
            key={item?.id}
            to={item?.link}
            className={({ isActive }) =>
              isActive
                ? "text-lg font-medium bg-gray-200 text-red-600 py-3 pl-5 pr-14 border-b-2"
                : "py-3 px-5 hover:bg-gray-200 text-lg font-medium"
            }
          >
            {item?.value}
          </NavLink>
        ))}
      </section>
    </div>
  );
}

export default SideBar;
