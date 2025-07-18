import "./styles.scss";
import "@ui/bread-crumb";
import "@widgets/header";
import "@widgets/footer";
import "@widgets/cart-modal";
import "@widgets/custom-modal";

import LazyLoad from "vanilla-lazyload";
import { store } from "@app/store";
import { initModals } from "@features/modal";
import { initScrollbar } from "@shared/lib/scrollbar";
import { initHeader } from "@widgets/header";
import { initClickSmoothScroll } from "@shared/lib/helpers";
import { initCartController } from "@entities/cart-controller";
import { initCartModal } from "@widgets/cart-modal";
import { initMobileContentModal } from "@widgets/mobile-content-modal";
import { initSwiperOverflow } from "@shared/ui/swiper-overflow";


export function initBase() {
  store.lazyload = new LazyLoad();
  window.store = store;

  initHeader();
  initScrollbar();
  initSwiperOverflow();
  initModals();
  initMobileContentModal();
  initClickSmoothScroll();
  
  initCartController();
  initCartModal();
}

document.addEventListener("DOMContentLoaded", () => {
  initBase();
});