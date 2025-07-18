
import "swiper/css";
import "./styles.scss";

import Swiper from "swiper";
import { Autoplay, EffectCreative, Navigation, Pagination } from "swiper/modules";

import "@ui/icon";
import "@icons/arrow-left.svg";
import "@icons/arrow-right.svg";


export function initWelcome() {
  const el = document.querySelector<HTMLDivElement>(".js-welcome-slider");

  if (el) {
    const [prevEl, nextEl] = el.querySelectorAll<HTMLButtonElement>(".js-prev, .js-next");

    new Swiper(el, {
      effect: "creative",
      loop: true,
      autoplay: {
        delay: 4000,
      },
      speed: 2000,
      navigation: {
        prevEl,
        nextEl,
      },
      pagination: {
        el: ".swiper-pagination",
        type: "bullets",
      },
      creativeEffect: {
        limitProgress: 1,
        prev: {
          shadow: true,
          translate: ["-50%", 0, -1],
        },
        next: {
          translate: ["100%", 0, 0],
        },
      },
      modules: [Navigation, EffectCreative, Autoplay, Pagination],
    });
  }
}