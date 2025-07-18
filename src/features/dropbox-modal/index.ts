import "./styles.scss";
import { ModalElement } from "@features/modal";

export class DropboxModal {
  modal: ModalElement;
  window: HTMLElement | null;

  constructor(el: ModalElement) {
    this.modal = el;
    this.window = this.modal.querySelector<HTMLElement>(".js-modal-window");

    this.init()
  }

  init() {
    this.modal.addEventListener("beforeOpen", this.handleBeforeOpen);
  }

  handleBeforeOpen = (e: CustomEvent) => {
    const {detail: { trigger }} = e;

    if (trigger instanceof HTMLButtonElement) {
      const { top, left, width, height } = trigger.getBoundingClientRect();
      
      window.scrollBy({
        top: top - (window.innerHeight + height) / 2,
        behavior: "smooth",
      });

      this.window.style.cssText = `transform: translate(calc(-100% + ${left + width}px / 2), -50%)`
    }
  }
}

export function initDropboxModal(selector: string) {
  const el = document.querySelector<ModalElement>(selector);

  if (el) {
    return new DropboxModal(el);
  }

  return null;
}