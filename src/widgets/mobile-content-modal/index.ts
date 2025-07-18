import "./styles.scss";
import "@features/modal";

import { ModalElement } from "@features/modal";


export class MobileContentModal {
  el: ModalElement;
  wrapper: HTMLElement | null;
  content: HTMLElement | null = null;
  contentWrapper: HTMLElement | null = null;

  constructor(el: ModalElement) {
    this.el = el;
    this.wrapper = el.querySelector<HTMLElement>(".js-content-wrapper");

    this.init();
  }

  init() {
    this.el.addEventListener("beforeOpen", this.handleBeforeOpen)
    this.el.addEventListener("close", this.handleClose)
  }

  handleClose = () => {
    if (this.content && this.contentWrapper) {
      this.contentWrapper.append(this.content);
      this.content = null;
      this.contentWrapper = null;
      this.el.removeAttribute("data-target-id");
    }
  }

  handleBeforeOpen = (e: CustomEvent<{ trigger: HTMLButtonElement  }>) => {
    const { detail: { trigger }} = e;
    const target = trigger?.getAttribute("data-target-id");

    if (!this.wrapper || !target) return;
    
    const content = document.querySelector<HTMLElement>(`[data-target-id="${target}"].js-modal-content`);

    if (content) {
      this.content = content;
      this.contentWrapper = content.parentElement;
      this.wrapper.append(content);
      this.el.setAttribute("data-target-id", target);
    }
    
  }
}

export function initMobileContentModal () {
  const el = document.querySelector<ModalElement>('.js-modal[data-modal-id="mobile-content-modal"]');
  
  if (el) {
    new MobileContentModal(el);
  }
}