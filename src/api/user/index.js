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
export const contact = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const rs = await axios({
        method: "post",
        url: "/api/user/contact",
        data,
      });
      resolve(rs);
    } catch (error) {
      reject(error.response);
    }
  });
export const updateCart = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const rs = await axios({
        method: "put",
        url: "/api/user/cart",
        data,
      });
      resolve(rs);
    } catch (error) {
      reject(error.response);
    }
  });
export const deleteCart = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const rs = await axios({
        method: "put",
        url: "/api/user/deletecart",
        data,
      });
      resolve(rs);
    } catch (error) {
      reject(error.response);
    }
  });
export const updateUser = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const rs = await axios({
        method: "put",
        url: "/api/user/update",
        data,
      });
      resolve(rs);
    } catch (error) {
      reject(error.response);
    }
  });
export const createOrder = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const rs = await axios({
        method: "post",
        url: "/api/user/order",
        data,
      });
      resolve(rs);
    } catch (error) {
      reject(error.response);
    }
  });
export const getOrders = (params) =>
  new Promise(async (resolve, reject) => {
    try {
      const rs = await axios({
        method: "get",
        url: "/api/user/all-order",
        params,
      });
      resolve(rs);
    } catch (error) {
      reject(error.response);
    }
  });
export const updateOrders = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const rs = await axios({
        method: "put",
        url: "/api/user/update-status",
        data,
      });
      resolve(rs);
    } catch (error) {
      reject(error.response);
    }
  });
