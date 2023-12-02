import { SidebarProduct } from "components";
import { Outlet } from "react-router-dom";

function LayoutProduct() {
  return (
    <div className="flex justify-center items-center my-10">
      <div className="w-[75%] flex justify-between">
        <div className="w-[25%]">
          <SidebarProduct />
        </div>
        <div className="w-[74%]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default LayoutProduct;
