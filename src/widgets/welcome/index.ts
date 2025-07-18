
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
        delay: 5000,
      },
      speed: 600,
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
      breakpoints: {
        768.001: {
          speed: 1000,
        }
      },
      modules: [Navigation, EffectCreative, Autoplay, Pagination],
    });
  }
}