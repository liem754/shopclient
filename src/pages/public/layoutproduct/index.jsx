import { SidebarProduct } from "components";
import { Outlet } from "react-router-dom";

function LayoutProduct() {
  return (
    <div className="flex justify-center items-center my-10">
      <div className="w-[75%] sm:w-[90%] xs:w-[94%] md:w-[85%] flex justify-between">
        <div className="w-[25%] sm:hidden xs:hidden md:hidden">
          <SidebarProduct />
        </div>
        <div className="w-[74%] sm:w-[95%] xs:w-[95%] md:w-[95%]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default LayoutProduct;
