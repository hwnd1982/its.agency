import "@widgets/welcome";
import "@widgets/products";
import "@widgets/sort-dropbox";

import { initProducts } from "@widgets/products";
import { initWelcome } from "@widgets/welcome";
import { initSortDropbox } from "@widgets/sort-dropbox";

document.addEventListener("DOMContentLoaded", () => {
  initWelcome();
  initProducts();
  initSortDropbox()
});

