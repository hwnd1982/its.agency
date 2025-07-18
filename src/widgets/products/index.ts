
import "./styles.scss";
import "@features/products-list";
import "@features/products-filter";
import "@features/dropbox-modal";

import { initProductsController } from "@entities/products-controller";
import { initProductsList } from "@features/products-list";
import { initProductsFilter } from "@features/products-filter";


export function initProducts() {
  initProductsController();

  initProductsFilter();
  initProductsList();
}