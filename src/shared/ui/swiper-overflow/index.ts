
import { states } from "@shared/config/states";
import Swiper from "swiper";
import { Controller, FreeMode, Manipulation } from "swiper/modules";

export function initSwiperOverflow(container: HTMLElement = document.body) {
  const swipers = container.querySelectorAll<HTMLElement>(
    ".js-swiper-overflow",
  );

  swipers.forEach((swiper) => {
    new Swiper(swiper, {
      slidesPerView: "auto",
      freeMode: true,
      watchSlidesProgress: true,
      modules: [FreeMode, Manipulation, Controller],
      on: {
        init(swiper) {
          const initialSlide = swiper.el.getAttribute("data-initial-slide");

          if (!swiper.slides.length) {
            swiper.slides.length;
            swiper.el.classList.add(states.hidden);
          }

          if (initialSlide !== null) {
            swiper.slideTo(+initialSlide, 0);
          }
        },
        click(swiper) {
          swiper.slideTo(swiper.clickedIndex);
        },
      },
    });
  });
}
