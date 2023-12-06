import { SideBarBlog } from "components";
import { Outlet } from "react-router-dom";

function LayoutBlog() {
  return (
    <div className=" flex justify-center items-center my-10">
      <div className="w-[75%] lg:w-[80%] md:w-[87%] sm:w-[92%] xs:w-[92%]  gap-4">
        <div className="w-[74%] border p-4 sm:w-[95%] xs:w-[95%]">
          <Outlet />
        </div>
        <div className="w-[25%] border sm:hidden xs:hidden">
          <SideBarBlog />
        </div>
      </div>
    </div>
  );
}

export default LayoutBlog;
