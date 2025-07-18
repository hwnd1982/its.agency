
import "./styles.scss";
import "@features/dropbox-modal";
import { DropboxModal, initDropboxModal } from "@features/dropbox-modal";
import { ModalElement } from "@features/modal";
import { states } from "@shared/config/states";

class SortDropbox {
  modal: ModalElement;
  options: NodeListOf<HTMLLabelElement>;
  trigger?: HTMLButtonElement;

  constructor (el: DropboxModal) {
    this.modal = el.modal;
    this.options = document.querySelectorAll<HTMLLabelElement>("label.js-sort-option");

    this.init();
  }

  init() {
    document.addEventListener("set.products.filter", this.handleProductsFilterSet);
    this.modal.addEventListener("beforeOpen", this.handleBeforeOpen);
  }

  handleBeforeOpen = (e: CustomEvent) => {
    const { detail: { trigger }} = e;

    if (trigger instanceof HTMLButtonElement) {
      this.trigger = trigger;
    }
  }

  handleProductsFilterSet = (e: CustomEvent<{name: string, value: string, checked: boolean}>) => {
    const { detail: { name, value } } = e;

    if (name === "sort") {
      this.options?.forEach(option => {
        const isChecked = option.htmlFor === `${name}-${value}`;
        
        option.classList[isChecked ? "add" : "remove"](states.active);

        if (isChecked && this.trigger) {
          this.trigger.textContent = option.textContent;
        }
      });
    }

    this.modal.modal.close();
  }
}

export function initSortDropbox () {
  const el = initDropboxModal('.js-modal[data-modal-id="sort-dropbox"]');
  if (el) {
    new SortDropbox(el);
  }
}