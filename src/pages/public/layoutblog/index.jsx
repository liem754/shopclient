import { SideBarBlog } from "components";
import { Outlet } from "react-router-dom";

function LayoutBlog() {
  return (
    <div className=" flex justify-center items-center my-10">
      <div className="w-[75%] flex gap-4">
        <div className="w-[74%] border p-4">
          <Outlet />
        </div>
        <div className="w-[25%] border">
          <SideBarBlog />
        </div>
      </div>
    </div>
  );
}

export default LayoutBlog;
