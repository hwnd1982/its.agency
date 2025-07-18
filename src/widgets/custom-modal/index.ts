import "./styles.scss";
import "@features/modal";

import { Modal, ModalElement } from "@features/modal";

export type OpenCustomModalProps = {
  title?: string;
  description?: string;
  button?: string;
  html?: string;
  confirm?: (modal: Modal) => void;
};

export function openCustomModal(props: OpenCustomModalProps) {
  const { title, description, button, html, confirm } = props;

  const customModal = document.querySelector<ModalElement>(
    `[data-modal-id="custom-modal"].js-modal`,
  );

  if (!customModal) return;

  const contentCustomModal = customModal.querySelector<HTMLElement>(
    ".js-modal-body",
  );

  if (!contentCustomModal) return;

  if (html) {
    contentCustomModal.innerHTML = html;
  } else {
    contentCustomModal.innerHTML = `
      ${title ? `<p class="modal__title">${title}</p>` : ""}
      ${description ? `<p class="modal__description">${description}</p>` : ""}
      ${button ? `<button class="modal__button js-modal-close"><span>${button}</span></button>` : ""}`;

    if (confirm) {
      contentCustomModal
        .querySelector<HTMLButtonElement>(".js-modal-confirm")
        .addEventListener("click", () => confirm(customModal.modal));
    }
  }

  customModal.modal.open();
}