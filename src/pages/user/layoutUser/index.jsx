import { Outlet } from "react-router-dom";
import SideBar from "../sideBar";
import { Footer } from "components";

function LayoutUser() {
  return (
    <div className="">
      <div className="flex gap-4">
        <div className="w-[22%]">
          <SideBar />
        </div>
        <div className="w-[77%]">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default LayoutUser;
