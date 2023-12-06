import { Swiper, SwiperSlide } from "swiper/react";
import {
  Pagination,
  Navigation,
  EffectCoverflow,
  Autoplay,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { memo } from "react";
import { ItemProduct, ProductReview } from "components";
function SliderProduct({ list, d, md, sm }) {
  return (
    <div className="w-full">
      <Swiper
        grabCursor={true}
        // centeredSlides={true}
        // loop={true}

        effect="cube"
        spaceBetween={10}
        slidesPerView={
          d && !md ? 4 : md && d && !sm ? 3 : d && sm && md ? 2 : 1
        }
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{
          //   el: ".swiper-pagination",
          clickable: true,
        }}
        loop={true}
        scrollbar={{ draggable: true }}
        autoplay={{
          delay: 15000,
          disableOnInteraction: false,
        }}
        speed={800}
        modules={[Autoplay, Pagination, Navigation, EffectCoverflow]}
      >
        {list && !d
          ? list?.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <ProductReview
                    id={item?._id}
                    title={item?.title}
                    price={item?.price}
                    img={item?.images}
                  />
                </SwiperSlide>
              );
            })
          : list?.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <ItemProduct
                    id={item?._id}
                    title={item?.title}
                    price={item?.price}
                    img={item?.images}
                  />
                </SwiperSlide>
              );
            })}
      </Swiper>
    </div>
  );
}

export default SliderProduct;
