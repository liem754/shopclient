import bn1 from "access/banner1.jpg";
import bn2 from "access/banner2.jpg";
import bn3 from "access/bn3.png";
import bn4 from "access/bn4.png";
import bn5 from "access/bn5.png";
import bn6 from "access/parallax.png";
import AOS from "aos";
import "aos/dist/aos.css";
import { getNews } from "api/blog";
import { BlogItem, ItemProduct, ParallaxItem, Slider } from "components";
import SliderProduct from "components/sliderproduct";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { getProductss } from "store/product/asyncActions";
import { setActive } from "store/product/productSlice";
import { Icons } from "ultils/icon";

const { PiHandbagDuotone, IoIosGift } = Icons;
const list = [
  {
    id: 1,
    img: bn1,
  },
  {
    id: 2,
    img: bn2,
  },
];
function Home() {
  const [blogs, setBlogs] = useState([]);
  const { isLogginned, data, mes } = useSelector((state) => state.user);

  const fetch = async (params) => {
    try {
      const rs = await getNews(params);
      if (rs.data.success) {
        setBlogs(rs.data?.news);
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetch({ limit: 8 });
    dispatch(setActive(""));
    AOS.init({ duration: 1000 });
  }, []);
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(getProductss({ limit: 8 }));
  }, []);
  return (
    <div className="">
      <Slider list={list} />
      <div className="flex flex-col justify-center items-center py-10 gap-9">
        <section className=" w-[75%] md:w-[80%] sm:w-[90%] xs:w-[90%] flex justify-between items-center">
          <img
            src={bn3}
            alt=""
            className="w-[30%] hover:scale-105 cursor-pointer transition delay-75"
          />
          <img
            src={bn4}
            alt=""
            className="w-[30%] hover:scale-105 cursor-pointer transition delay-75"
          />
          <img
            src={bn5}
            alt=""
            className="w-[30%] hover:scale-105 cursor-pointer transition delay-75"
          />
        </section>
        <section className="w-[75%] md:w-[80%] sm:w-[90%] xs:w-[90%] mt-10">
          <h1 className="border-dashed font-semibold text-xl border-2 border-indigo-600 p-2 flex items-center gap-2">
            <PiHandbagDuotone size={"30px"} />
            <p>SẢN PHẨM CỦA CHÚNG TÔI</p>
          </h1>
          <div className="flex items-center flex-wrap gap-6 my-10">
            {products?.products?.map((item, index) => (
              <div
                className="w-[23%] lg:w-[30%] md:w-[30%] sm:w-[45%] xs:w-[98%]"
                data-aos="fade-up"
                data-aos-delay={`${index * 200}`}
                key={index}
              >
                <ItemProduct
                  id={item?._id}
                  img={item?.images}
                  title={item?.title}
                  price={item?.price}
                />
              </div>
            ))}
          </div>
        </section>
      </div>
      <div className="mt-10 bg-[#4e1e2a] flex flex-col justify-center items-center py-10 mb-10 gap-9">
        <section className="w-[75%] md:w-[80%] sm:w-[90%] xs:w-[90%]">
          <h1 className="border-dashed text-yellow-500 font-semibold text-xl border-2 border-white p-3 flex items-center gap-2">
            <IoIosGift size={"30px"} />
            <p className="">SẢN PHẨM NỔI BẬC</p>
          </h1>
          <div className="flex items-center flex-wrap gap-6 my-10">
            <SliderProduct list={products?.products} />
          </div>
        </section>
      </div>
      <div className="w-full h-[500px] mt-32">
        <ParallaxItem
          img={bn6}
          content={
            <div className="flex flex-col justify-center items-center gap-2">
              <h2 className="text-2xl font-bold">MOSASHOP</h2>
              <h2 className="text-2xl font-bold">FASHION</h2>
            </div>
          }
        />
      </div>
      <div className="mt-2 flex flex-col justify-center items-center py-10 mb-10 gap-9">
        <section className="w-[75%] md:w-[80%] sm:w-[90%] xs:w-[90%]">
          <h1 className="border-dashed font-semibold text-xl border-2 border-blue-700 p-3 flex items-center gap-2">
            <IoIosGift size={"30px"} />
            <p className="">TIN TỨC</p>
          </h1>
          <div className="flex items-center flex-wrap gap-6 my-10">
            {blogs?.map((item) => (
              <Link
                to={`/blog/${item?._id}`}
                key={item?._id}
                className="w-[30%] md:w-[48%] sm:w-[47%] xs:w-[97%] h-[570px]"
              >
                <BlogItem
                  img={item?.images[0]}
                  title={item?.title}
                  time={item?.createdAt}
                  description={item?.description}
                />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
