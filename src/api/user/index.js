import axios from "axiosConfig";

export const register = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const rs = await axios({
        method: "post",
        url: "/api/user/register",
        data,
      });
      resolve(rs);
    } catch (error) {
      reject(error.response);
    }
  });
export const apilogin = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const rs = await axios({
        method: "post",
        url: "/api/user/login",
        data,
      });
      resolve(rs);
    } catch (error) {
      reject(error.response);
    }
  });
export const apiGetOne = () =>
  new Promise(async (resolve, reject) => {
    try {
      const rs = await axios({
        method: "get",
        url: "/api/user/",
      });
      resolve(rs);
    } catch (error) {
      reject(error.response);
    }
  });
