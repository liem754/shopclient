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
function Slider({ list, auto, active }) {
  return (
    <div className="">
      <Swiper
        // effect="coverflow"
        grabCursor={true}
        // centeredSlides={true}
        // loop={true}

        effect="cube"
        spaceBetween={30}
        slidesPerView={1}
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
        navigation={{
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
        {list &&
          list?.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <div className="flex w-full justify-center">
                  <div className={`${auto ? "h-auto" : "h-[450px]"} w-full`}>
                    {active ? (
                      <img
                        className=" h-[100%] w-[100%] object-cover"
                        src={active ? active : item}
                        alt=""
                      />
                    ) : (
                      <img
                        className=" h-[100%] w-[100%] object-cover"
                        src={auto ? item : item.img}
                        alt=""
                      />
                    )}
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
}

export default memo(Slider);
