import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Icons } from "ultils/icon";

const {
  CiMail,
  FaPhone,
  MdContacts,
  MdOutlinePreview,
  MdFiberNew,
  IoHomeSharp,
  FaSquareFacebook,
} = Icons;
const navi = [
  {
    icon: <MdOutlinePreview />,
    value: "Giới thiệu",
    link: "/introduce",
  },
  {
    icon: <MdContacts />,
    value: "Liên hệ",
    link: "/contact",
  },
  {
    icon: <MdFiberNew />,
    value: "Tin tức",
    link: "/blog",
  },
];
function Footer() {
  const { categorys } = useSelector((state) => state.product);

  return (
    <div className="bg-black py-10 text-white flex  justify-center items-center">
      <div className="w-[75%] sm:w-[90%] md:w-[90%] xs:w-[90%] lg:w-[80%] xl:w-[80%] flex sm:flex-col xs:flex-col flex-row justify-between gap-6 ">
        <section className="flex flex-col gap-2 flex-1 ">
          <h2 className="  inline">LIÊN HỆ CHÚNG TÔI</h2>
          <div className="border-2 w-[30%] mb-2"></div>
          <div className=" flex flex-col gap-2">
            <h2 className="flex items-center gap-1 md:text-sm">
              <IoHomeSharp
                size={"28px"}
                className=" sm:hidden xs:hidden md:hidden lg:hidden"
              />
              <p>Louis Tower, Nguyễn Ảnh Thủ, Hóc Môn, TP Hồ Chí Minh</p>
            </h2>
            <h2 className="flex items-center gap-1 md:text-sm">
              <FaPhone />
              <p>0999 888 777</p>
            </h2>
            <h2 className="flex items-center gap-1 md:text-sm">
              <CiMail size={"18px"} />
              <p>abc@gmail.com</p>
            </h2>
            <h2 className="flex items-center gap-1 md:text-sm">
              <FaSquareFacebook />
              <p>liem pham</p>
            </h2>
          </div>
        </section>
        <section className="flex flex-col gap-2 flex-1 ">
          <h2 className=" inline">LIÊN KẾT</h2>
          <div className="border-2 w-[30%] mb-2"></div>

          <div className=" flex flex-col gap-2 md:text-sm">
            <Link
              to={"/"}
              className="flex cursor-pointer hover:text-red-500 items-center gap-1 pb-2 border-b border-gray-600"
            >
              <IoHomeSharp />
              <p>Trang chủ</p>
            </Link>
            <Link
              to={`/product/Áo%20Thun%20Nữ`}
              className="flex items-center gap-1 cursor-pointer hover:text-red-500 pb-2 border-b border-gray-600"
            >
              <FaPhone />
              <p>Sản phẩm</p>
            </Link>
            {navi?.map((item) => (
              <Link
                key={item?.id}
                to={item?.link}
                className="flex items-center gap-1 pb-2 cursor-pointer hover:text-red-500 border-b border-gray-600"
              >
                {item?.icon}
                <p>{item?.value}</p>
              </Link>
            ))}
          </div>
        </section>
        <section className="flex flex-col gap-2 flex-1 ">
          <h2 className=" inline">DANH MỤC SẢN PHẨM</h2>
          <div className="border-2 w-[30%] mb-2"></div>

          <div className=" flex flex-col gap-2 md:text-sm">
            {categorys?.map((item) => (
              <span
                className=" hover:underline hover:underline-offset-2 cursor-pointer"
                key={item?._id}
              >
                {item?.value}
              </span>
            ))}
          </div>
        </section>
        <section className="flex flex-col gap-2 flex-1 ">
          <h2 className=" inline">FANPAGE FACEBOOK</h2>
          <div className="border-2 w-[30%] mb-2"></div>

          <div className=" flex flex-col gap-2">
            <h2 className="flex items-center gap-1">
              <img
                src="https://scontent.fsgn8-4.fna.fbcdn.net/v/t39.30808-1/380700650_10162533193146729_2379134611963304810_n.jpg?stp=cp0_dst-jpg_p50x50&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=ETP_g8b7gW8AX-xgrox&_nc_oc=AQnlmtf8gSsry_4YNjVw1ljZOVhXFCmomLK9vbvhcFmkd-IvCiTb5rO2UxOGqu9mGFw&_nc_ht=scontent.fsgn8-4.fna&edm=AASjF90EAAAA&oh=00_AfCSwgJwln8Z0PI0kiBt2DOby1K_1TJv1giVNE-6Dpiwww&oe=6565114E"
                alt=""
              />
            </h2>
            <h2 className="flex items-center gap-1">
              <FaPhone />
              <p>0999 888 777</p>
            </h2>
            <h2 className="flex items-center gap-1">
              <CiMail size={"18px"} />
              <p>abc@gmail.com</p>
            </h2>
            <h2 className="flex items-center gap-1">
              <FaSquareFacebook />
              <p>liem pham</p>
            </h2>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Footer;
