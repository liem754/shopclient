import logo from "access/logo.png";
import "./header.css";
import Button from "components/button";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "store/user/userSlice";
import { getCurrent } from "store/user/asyncActions";
import Swal from "sweetalert2";
import { Icons } from "ultils/icon";
const { BsBag, FaPhone, FaIdCard, FaCarSide, FaPhoneVolume } = Icons;
function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLogginned, data, mes } = useSelector((state) => state.user);
  const handle = useCallback((status) => {
    navigate("/login", { state: { status } });
  }, []);
  useEffect(() => {
    const time = setTimeout(() => {
      if (mes === "Token has expired !" && isLogginned) {
        Swal.fire(
          "Oop!",
          "Phiên đăng nhập hết hạn, vui lòng đăng nhập lại !",
          "info"
        ).then(() => {
          dispatch(logout());
        });
      }
    }, 3000);

    return () => {
      clearTimeout(time);
    };
  }, [mes]);
  useEffect(() => {
    const time = setTimeout(() => {
      isLogginned && dispatch(getCurrent());
    }, 2000);

    return () => {
      clearTimeout(time);
    };
  }, [isLogginned]);
  return (
    <header className="all ">
      <div className="main">
        <section className=" w-[15%]" onClick={() => navigate("/")}>
          <img src={logo} alt="" className="image" />
        </section>
        <section className=" flex items-center justify-between w-[45%]">
          <nav className="flex gap-3 items-center">
            <FaPhoneVolume size={"30px"} />
            <div className=" flex flex-col">
              <h2 className="text-xs font-medium">HOTLINE</h2>
              <p className="text-xs">0.999.88876</p>
            </div>
          </nav>
          <nav className="flex gap-3 items-center">
            <FaCarSide size={"30px"} />
            <div className=" flex flex-col">
              <h2 className="text-xs font-medium">MIỄN PHÍ GIAO HÀNG</h2>
              <p className="text-xs">Tận nơi - Toàn quốc</p>
            </div>
          </nav>
          <nav className="flex gap-3 items-center">
            <FaIdCard size={"30px"} />
            <div className=" flex flex-col">
              <h2 className="text-xs font-medium">HÌNH THỨC THANH TOÁN</h2>
              <p className="text-xs">Thanh toán linh động</p>
            </div>
          </nav>
        </section>
        <section className=" flex w-[40%] justify-end items-center ">
          {isLogginned ? (
            <div className="flex items-center gap-6">
              <nav className="flex items-center gap-2">
                <img
                  src={data?.avatar}
                  alt=""
                  className="w-[40px] h-[40px] rounded-[50%]"
                />
                <h2>
                  {data?.name
                    ? data?.name.charAt(0).toUpperCase() + data?.name.slice(1)
                    : ""}
                </h2>
              </nav>
              <div className="flex items-center gap-2">
                <h2>Giỏ hàng :</h2>
                <h3 className="relative hover:scale-105 cursor-pointer">
                  <BsBag size={"30px"} />
                  <span className="  absolute top-[6px] left-[10px]">0</span>
                </h3>
              </div>
              <Button
                Click={() => {
                  dispatch(logout());
                }}
                text={"Đăng xuất"}
                textColor={"text-black"}
                round={"rounded-md"}
                pd={"py-2 px-5"}
                border={"border border-gray-800 "}
                textCenter={"flex justify-center items-center"}
                hover={
                  " hover:text-white  hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-md  text-center me-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
                }
              />
            </div>
          ) : (
            <>
              <Button
                Click={() => handle(true)}
                text={"Đăng nhập"}
                textColor={"text-black"}
                round={"rounded-md"}
                pd={"py-2 px-5"}
                border={"border border-gray-800 "}
                textCenter={"flex justify-center items-center"}
                hover={
                  " hover:text-white  hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-md  text-center me-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
                }
              />
              <Button
                Click={() => handle(false)}
                text={"Đăng ký"}
                textColor={"text-green-700"}
                round={"rounded-md"}
                pd={"py-2 px-5"}
                border={"border border-green-700"}
                textCenter={"flex justify-center items-center"}
                hover={
                  " hover:text-white  hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-md  text-center me-2  dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
                }
              />
            </>
          )}
        </section>
      </div>
    </header>
  );
}

export default Header;
