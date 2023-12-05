import logo from "access/logo.png";
import "./header.css";
import Button from "components/button";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "store/user/userSlice";
import { getCurrent } from "store/user/asyncActions";
import Swal from "sweetalert2";
import { Icons } from "ultils/icon";

import { navi } from "ultils/contans";
const {
  BsBag,
  FaIdCard,
  FaCarSide,
  FaPhoneVolume,
  GiHamburgerMenu,
  AiOutlineClose,
  IoHomeSharp,
  FaRegUserCircle,
  PiShirtFolded,
} = Icons;
function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const { isLogginned, data, han } = useSelector((state) => state.user);
  const handle = useCallback((status) => {
    navigate("/login", { state: { status } });
    setShow(false);
  }, []);
  useEffect(() => {
    const time = setTimeout(() => {
      if (han && isLogginned) {
        Swal.fire(
          "Oop!",
          "Phiên đăng nhập hết hạn, vui lòng đăng nhập lại !",
          "info"
        ).then(() => {
          dispatch(logout());
        });
      }
    }, 4000);

    return () => {
      clearTimeout(time);
    };
  }, [han]);
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
      <div className="main w-[75%] lg:w-[85%] sm:w-[90%] xs:w-[90%] md:w-[90%]">
        <section
          className=" w-[15%] sm:w-[35%] md:w-[25%] xs:w-[37%]"
          onClick={() => navigate("/")}
        >
          <img src={logo} alt="" className="image w-[70%]" />
        </section>
        <section className="md:hidden lg:hidden sm:hidden xs:hidden flex items-center justify-between w-[45%]">
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
        <section className="hidden sm:block xs:block relative">
          {show ? (
            <AiOutlineClose
              onClick={() => setShow(false)}
              color="blue"
              size={"30px"}
              className=" cursor-pointer"
            />
          ) : (
            <GiHamburgerMenu
              onClick={() => setShow(true)}
              color="blue"
              size={"30px"}
              className=" cursor-pointer"
            />
          )}

          {show && (
            <div className=" bg-black p-5 rounded-md text-white absolute top-[115%] -left-[200px] z-10 w-[250px]  justify-end items-center ">
              {isLogginned ? (
                <div className="flex flex-col  gap-4">
                  <Link
                    to={`/user/information`}
                    className="flex items-center hover:text-red-400 hover:underline hover:underline-offset-4  gap-2 relative "
                  >
                    <FaRegUserCircle />
                    <span>Thông tin tài khoản</span>
                  </Link>
                  <Link
                    to={"/user/cart"}
                    className="flex items-center gap-2 hover:text-red-400 cursor-pointer hover:underline hover:underline-offset-4 "
                  >
                    <BsBag />
                    <h2 className=" ">Giỏ hàng</h2>
                  </Link>
                  <Link
                    to={"/"}
                    className={
                      "items-center gap-1 flex  hover:text-red-400 hover:underline hover:underline-offset-4 "
                    }
                  >
                    <IoHomeSharp />
                    <span>Trang chủ</span>
                  </Link>
                  <Link className=" flex hove items-center gap-1   hover:text-red-400 hover:underline hover:underline-offset-4  cursor-pointer">
                    <PiShirtFolded />
                    <p>Sản phẩm</p>
                  </Link>

                  {navi?.map((item, index) => (
                    <Link
                      className={
                        "items-center gap-1 flex  hover:text-red-400 hover:underline hover:underline-offset-4 "
                      }
                      key={index}
                      to={item?.link}
                    >
                      {item?.icon}
                      <span>{item?.value}</span>
                    </Link>
                  ))}
                  <Button
                    Click={() => {
                      dispatch(logout());
                    }}
                    text={"Đăng xuất"}
                    textColor={"text-black xs:text-white sm:text-white"}
                    round={"rounded-md"}
                    pd={"py-2 px-5"}
                    border={
                      "border border-gray-800 xs:border-white sm:border-white "
                    }
                    textCenter={"flex justify-center items-center"}
                    hover={
                      " hover:text-white  hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-md  text-center me-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
                    }
                  />
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Button
                    Click={() => handle(true)}
                    text={"Đăng nhập"}
                    textColor={"text-black xs:text-white sm:text-white"}
                    round={"rounded-md"}
                    pd={"py-2 px-5"}
                    border={
                      "border border-gray-800 xs:border-white sm:border-white "
                    }
                    textCenter={"flex justify-center items-center"}
                    hover={
                      " hover:text-white  hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-md  text-center me-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
                    }
                  />
                  <Button
                    Click={() => handle(false)}
                    text={"Đăng ký"}
                    textColor={"text-green-700 xs:text-white sm:text-white"}
                    round={"rounded-md"}
                    pd={"py-2 px-5"}
                    border={
                      "border border-green-700 xs:border-white sm:border-white"
                    }
                    textCenter={"flex justify-center items-center"}
                    hover={
                      " hover:text-white  hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-md  text-center me-2  dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
                    }
                  />
                </div>
              )}
            </div>
          )}
        </section>
        <section className=" sm:hidden xs:hidden flex w-[40%] md:w-[65%] lg:w-[65%] sm:w-[65%] xs:w-[65%] justify-end items-center ">
          {isLogginned ? (
            <div className="flex items-center gap-6">
              <Link
                to={`/user/information`}
                className="flex items-center gap-2 relative "
              >
                <img
                  src={data?.avatar}
                  alt=""
                  className="w-[40px] h-[40px] rounded-[50%] cha"
                />
                <h2 className="te font-medium">
                  {data?.name
                    ? data?.name.charAt(0).toUpperCase() + data?.name.slice(1)
                    : ""}
                </h2>
                <h2 className=" absolute top-[110%] -left-4 p-3 shadow-xl w-[110px] rounded-md text-white font-medium hidden bg-blue-500 text-xs hov">
                  Xem tài khoản
                </h2>
              </Link>
              <div className="flex items-center gap-2 ">
                <h2>Giỏ hàng :</h2>
                <Link
                  to={"/user/cart"}
                  className="relative hover:scale-105 cursor-pointer"
                >
                  <BsBag size={"30px"} />
                  <span className="  absolute top-[8px] text-sm left-[11px]">
                    {data?.cart?.length}
                  </span>
                </Link>
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
