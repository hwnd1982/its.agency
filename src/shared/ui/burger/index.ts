import { states } from "@shared/config/states";
import "./styles.scss";
import "@ui/button-icon";
import { ModalElement } from "@features/modal";

class BurgerMenu {
  el: HTMLButtonElement;
  header: HTMLElement | null;
  modal: ModalElement | null;

  target: string;

  constructor (el: HTMLButtonElement) {
    this.el = el;
    this.target = this.el.getAttribute("data-target-id");
    this.header = document.querySelector<HTMLElement>(".js-header");
    this.modal = document.querySelector<ModalElement>('.js-modal[data-modal-id="mobile-content-modal"]');


    this.init();
  }

  private init() {
    this.el.addEventListener("click", this.handleClick);
    this.modal.addEventListener("beforeClose", this.handleBeforeClose)
  }

  private handleBeforeClose = () => {
    console.log("data-target-id", this.target === this.modal.getAttribute("data-target-id"));
    this.el.classList.remove(states.open);
    this.header.classList.remove(states.show);
  }

  private handleClick = () => {
    this[this.el.classList.contains(states.open) ? "close" : "open"]();
  };

  private handleOverlayClick = ({target}: Event) => {
    if (target instanceof HTMLElement || target instanceof SVGElement) {
      const menu = target.closest<HTMLElement>(".js-burger-menu");
      const burger = target.closest<HTMLElement>(".js-burger");
      const action = target.closest<HTMLElement>("button:not(.js-burger), a[href]");

      if ((!menu && !burger) || !!action) {
        this.close();
      }
    }
  };

  private open = () => {
    this.el.classList.add(states.open);
    this.header.classList.add(states.show);
    document.addEventListener("click", this.handleOverlayClick);
  }

  private close = () => {
    this.modal.modal.close();

    document.removeEventListener("click", this.handleOverlayClick);
  }
}

export function initBurgerMenu() {
  const el = document.querySelector<HTMLButtonElement>('.js-burger');

  if (el) {
    new BurgerMenu(el);
  }
}
