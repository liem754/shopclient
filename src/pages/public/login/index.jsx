import { useLocation, useSearchParams } from "react-router-dom";
import "./login.css";
import { useEffect, useState } from "react";
function Login() {
  const parm = useLocation();
  const [isLogin, setIsLogin] = useState(parm?.state?.status);
  useEffect(() => {
    setIsLogin(parm?.state?.status);
  }, [parm?.state]);
  return (
    <div className="wrapper flex justify-center items-center my-14 ">
      <div id="form-ui" className="w-[30%]">
        <div action="" method="post" id="form">
          <div id="form-body " className="w-full ">
            <div id="welcome-lines">
              <div id="welcome-line-1">MoSaShop</div>
              <div id="welcome-line-2">Welcome Back, Loyd</div>
            </div>
            {isLogin ? (
              <>
                <div id="input-area">
                  <div className="form-inp">
                    <input placeholder="Email Address" type="text" />
                  </div>
                  <div className="form-inp">
                    <input placeholder="Password" type="password" />
                  </div>
                </div>
                <div id="submit-button-cvr">
                  <button id="submit-button" type="submit">
                    Login
                  </button>
                </div>
                <span
                  onClick={() => setIsLogin(false)}
                  className="text-white  text-xs mt-3 cursor-pointer hover:text-red-500"
                >
                  Do not have an account ?
                </span>
              </>
            ) : (
              <>
                <div id="input-area">
                  <div className="form-inp">
                    <input placeholder="Name" type="text" />
                  </div>
                  <div className="form-inp mb-4">
                    <input placeholder="Phone" type="text" />
                  </div>
                  <div className="form-inp mb-4">
                    <input placeholder="Email Address" type="text" />
                  </div>
                  <div className="form-inp">
                    <input placeholder="Password" type="password" />
                  </div>
                </div>
                <div id="submit-button-cvr">
                  <button id="submit-button" type="submit">
                    Register
                  </button>
                </div>
                <span
                  onClick={() => setIsLogin(true)}
                  className="text-white text-xs mt-3 cursor-pointer hover:text-red-500"
                >
                  Login now?
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
