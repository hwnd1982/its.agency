import { states } from "@shared/config/states";
import "./styles.scss";
import "@ui/button-icon";


class BurgerMenu {
  el: HTMLButtonElement;
  header: HTMLElement | null;

  constructor (el: HTMLButtonElement) {
    this.el = el;
    this.header = document.querySelector<HTMLElement>(".js-header");


    this.init();
  }

  private init() {
    this.el.addEventListener("click", this.handleClick)
  }

  private handleClick = () => {
    this[this.el.classList.contains(states.open) ? "close" : "open"]();
  };

  private handleOverlayClick = ({target}: Event) => {
    if (target instanceof HTMLElement || target instanceof SVGElement) {
      const menu = target.closest<HTMLElement>(".js-burger-manu");
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
    document.addEventListener("click", this.handleOverlayClick)
  }

  private close = () => {
    const modalId = this.el.getAttribute("data-modal-id");

    this.el.classList.remove(states.open);
    this.header.classList.remove(states.show);

    if (modalId) {
      window.store.modal.closeById(modalId);
    }
    document.removeEventListener("click", this.handleOverlayClick);
  }
}

export function initBurgerMenu() {
  const el = document.querySelector<HTMLButtonElement>('.js-burger');

  if (el) {
    new BurgerMenu(el);
  }
}
