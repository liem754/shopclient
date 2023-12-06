import { Outlet } from "react-router-dom";
import SideBar from "../sideBar";
import { Footer } from "components";
import HeaderUser from "../headerUser";

function LayoutUser() {
  return (
    <div className="">
      <div className="flex flex-row sm:flex-col md:flex-col xs:flex-col lg:flex-col  gap-4">
        <div className="w-[20%] sm:hidden md:hidden xs:hidden lg:hidden">
          <SideBar />
        </div>
        <div className="  xl:hidden 2xl:hidden">
          <HeaderUser />
        </div>
        <div className="w-[80%] sm:w-[100%] md:w-[100%] lg:w-[100%] xs:w-[100%]">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default LayoutUser;
