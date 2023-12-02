import axios from "axiosConfig";
export const getCategorys = () =>
  new Promise(async (resolve, reject) => {
    try {
      const rs = await axios({
        url: "api/categorypd/",
        method: "get",
      });

      resolve(rs);
    } catch (error) {
      reject(error.response);
    }
  });
export const getProducts = (params) =>
  new Promise(async (resolve, reject) => {
    try {
      const rs = await axios({
        url: "api/product/",
        method: "get",
        params,
      });

      resolve(rs);
    } catch (error) {
      reject(error.response);
    }
  });
export const getProduct = (pid) =>
  new Promise(async (resolve, reject) => {
    try {
      const rs = await axios({
        url: "api/product/one/" + pid,
        method: "get",
      });

      resolve(rs);
    } catch (error) {
      reject(error.response);
    }
  });
export const getProductNext = (pid) =>
  new Promise(async (resolve, reject) => {
    try {
      const rs = await axios({
        url: "api/product/next/" + pid,
        method: "get",
      });

      resolve(rs);
    } catch (error) {
      reject(error.response);
    }
  });
export const ratings = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const rs = await axios({
        url: "api/product/rating",
        method: "put",
        data,
      });

      resolve(rs);
    } catch (error) {
      reject(error.response);
    }
  });
