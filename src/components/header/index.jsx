import logo from "access/logo.png";
import "./header.css";
import Button from "components/button";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
function Header() {
  const navigate = useNavigate();
  const handle = useCallback((status) => {
    navigate("/login", { state: { status } });
  }, []);
  return (
    <header className="all ">
      <div className="main">
        <section className="section">
          <img src={logo} alt="" className="image" />
        </section>
        <section className="section flex  justify-end items-center ">
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
        </section>
      </div>
    </header>
  );
}

export default Header;
