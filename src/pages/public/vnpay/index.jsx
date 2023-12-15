import React, { useState } from "react";
import axios from "axios";
import moment from "moment";
function PaymentComponent() {
  const [paymentUrl, setPaymentUrl] = useState("");
  function sortObject(obj) {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        str.push(encodeURIComponent(key));
      }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
      sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
  }
  // Gọi API VNPAY
  const callVnpayApi = async (data) => {
    try {
      await axios.get("");
    } catch (error) {
      // Xử lý lỗi khi gọi API VNPAY
      console.log(error);
    }
  };

  // Dữ liệu thanh toán
  const paymentData = {
    vnp_Amount: 1000000,
    vnp_Command: "pay",
    vnp_CreateDate: "20211209000000",
    // Thêm các thông tin thanh toán khác vào đây
  };

  // Gọi API VNPAY
  //   const createPaymentUrl = async () => {
  //     try {
  //       const response = await axios.post(
  //         "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html",
  //         {
  //           vnp_Version: "2.1.0",
  //           vnp_Command: "pay",
  //           vnp_TmnCode: "9JNT14HA",
  //           vnp_Locale: "vn",
  //           vnp_CurrCode: "VNĐ",
  //           vnp_OrderType: "other",
  //           vnp_Amount: 100000,
  //         }
  //       );

  //       // Xử lý phản hồi từ API
  //       console.log(response.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  return (
    <div>
      <a
        href="http://localhost:8888/order/create_payment_url"
        onClick={() => callVnpayApi()}
      >
        Tạo URL thanh toán
      </a>
      {paymentUrl && <a href={paymentUrl}>Thanh toán ngay</a>}
    </div>
  );
}

export default PaymentComponent;
