import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import "./login.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apilogin, register } from "api";
import Swal from "sweetalert2";
import { validate } from "ultils/validate";
import { loginSc } from "store/user/userSlice";
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const parm = useLocation();
  const [isLogin, setIsLogin] = useState(parm?.state?.status);
  const [invalided, setInvalided] = useState([]);
  const [payload, setPayload] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  useEffect(() => {
    setIsLogin(parm?.state?.status);
  }, [parm?.state]);

  const handle = async () => {
    // console.log(mesLogin);
    if (isLogin) {
      const final = { email: payload.email, password: payload.password };
      const valid = validate(final, setInvalided);
      if (valid === 0) {
        const rs = await apilogin(final);
        if (rs.data.err !== 0) {
          Swal.fire("Oops!", rs.data.mes, "info");
        } else {
          dispatch(loginSc({ token: rs.data.accessToken }));
          navigate("/");
        }
      }
    } else {
      const valid = validate(payload, setInvalided);
      if (valid === 0) {
        const rs = await register(payload);
        if (rs.data.err !== 0) {
          Swal.fire("Oops!", rs.data.mes, "info");
        } else {
          setIsLogin(true);
        }
      }
    }
  };
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
                  <div onFocus={() => setInvalided([])} className="form-inp">
                    <input
                      placeholder="Email Address"
                      type="text"
                      value={payload?.email}
                      onChange={(e) =>
                        setPayload((pre) => ({ ...pre, email: e.target.value }))
                      }
                    />
                    {invalided?.length > 0 &&
                      invalided.some((i) => i.name === "email") && (
                        <small className="text-red-500 text-xs">
                          {invalided.find((i) => i.name === "email")?.messeger}
                        </small>
                      )}
                  </div>
                  <div onFocus={() => setInvalided([])} className="form-inp">
                    <input
                      placeholder="Password"
                      type="password"
                      value={payload?.password}
                      onChange={(e) =>
                        setPayload((pre) => ({
                          ...pre,
                          password: e.target.value,
                        }))
                      }
                    />
                    {invalided?.length > 0 &&
                      invalided.some((i) => i.name === "password") && (
                        <small className="text-red-500 text-xs">
                          {
                            invalided.find((i) => i.name === "password")
                              ?.messeger
                          }
                        </small>
                      )}
                  </div>
                </div>
                <div id="submit-button-cvr">
                  <button
                    onClick={() => handle()}
                    id="submit-button"
                    type="submit"
                  >
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
                <div onFocus={() => setInvalided([])} id="input-area">
                  <div className="form-inp">
                    <input
                      placeholder="Name"
                      type="text"
                      value={payload?.name}
                      onChange={(e) =>
                        setPayload((pre) => ({ ...pre, name: e.target.value }))
                      }
                    />
                    {invalided?.length > 0 &&
                      invalided.some((i) => i.name === "name") && (
                        <small className="text-red-500 text-xs">
                          {invalided.find((i) => i.name === "name")?.messeger}
                        </small>
                      )}
                  </div>
                  <div
                    onFocus={() => setInvalided([])}
                    className="form-inp mb-4"
                  >
                    <input
                      placeholder="Phone"
                      type="text"
                      value={payload?.mobile}
                      onChange={(e) =>
                        setPayload((pre) => ({
                          ...pre,
                          mobile: e.target.value,
                        }))
                      }
                    />
                    {invalided?.length > 0 &&
                      invalided.some((i) => i.name === "mobile") && (
                        <small className="text-red-500 text-xs">
                          {invalided.find((i) => i.name === "mobile")?.messeger}
                        </small>
                      )}
                  </div>
                  <div
                    onFocus={() => setInvalided([])}
                    className="form-inp mb-4"
                  >
                    <input
                      placeholder="Email Address"
                      type="text"
                      value={payload?.email}
                      onChange={(e) =>
                        setPayload((pre) => ({ ...pre, email: e.target.value }))
                      }
                    />
                    {invalided?.length > 0 &&
                      invalided.some((i) => i.name === "email") && (
                        <small className="text-red-500 text-xs">
                          {invalided.find((i) => i.name === "email")?.messeger}
                        </small>
                      )}
                  </div>
                  <div className="form-inp">
                    <input
                      placeholder="Password"
                      type="password"
                      value={payload?.password}
                      onChange={(e) =>
                        setPayload((pre) => ({
                          ...pre,
                          password: e.target.value,
                        }))
                      }
                    />
                    {invalided?.length > 0 &&
                      invalided.some((i) => i.name === "password") && (
                        <small className="text-red-500 text-xs">
                          {
                            invalided.find((i) => i.name === "password")
                              ?.messeger
                          }
                        </small>
                      )}
                  </div>
                </div>
                <div id="submit-button-cvr">
                  <button
                    onClick={() => handle()}
                    id="submit-button"
                    type="submit"
                  >
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
