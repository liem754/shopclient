import { Icons } from "./icon";

const { AiFillStar, AiOutlineStar } = Icons;
export const VndFormat = (value) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
};
export const formatCode = (value) => {
  let kq = "";
  value?.split(" ").map((item) => {
    kq += item.charAt(0).toUpperCase();
  });
  return kq.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

export function format(n) {
  return n?.toLocaleString("it-IT", { style: "currency", currency: "VND" });
}
export const formatStar = (number) => {
  const stars = [];
  number = Math.round(number);
  for (let i = 0; i < +number; i++) stars.push(<AiFillStar color="#f1b400" />);
  for (let i = 5; i > +number; i--)
    stars.push(<AiOutlineStar color="#f1b400" />);
  return stars;
};
