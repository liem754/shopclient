import axios from "axiosConfig";
export const getNews = (params) =>
  new Promise(async (resolve, reject) => {
    try {
      const rs = await axios({
        url: "api/new/",
        method: "get",
        params,
      });

      resolve(rs);
    } catch (error) {
      reject(error.response);
    }
  });
export const getNewOne = (param) =>
  new Promise(async (resolve, reject) => {
    try {
      const rs = await axios({
        url: "api/new/" + param,
        method: "get",
      });

      resolve(rs);
    } catch (error) {
      reject(error.response);
    }
  });
