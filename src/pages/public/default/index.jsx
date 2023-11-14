import { Header } from "components";
import { Outlet } from "react-router-dom";
function Default() {
  return (
    <div className="">
      <Header />
      <div className="">
        <Outlet />
      </div>
    </div>
  );
}

export default Default;
