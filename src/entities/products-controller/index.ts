import { ProductsFilter } from "@features/products-filter";
import { ProductsList } from "@features/products-list";
import { PRODUCTS_API_URL } from "@shared/config/api";
import { isValidKey } from "@shared/lib/isValidKey";
import { pluralize } from "@shared/lib/pluralize";
import { ProductCardProps } from "@shared/ui/ptoduct-card";
import axios from "axios";


interface ProductsFilterMeta {
  is_new: number;
  in_stock: number;
  is_contract: number;
  is_exclusive: number;
  is_sale: number;
}

class ProductsController {
  list?: ProductsList;
  filter?: ProductsFilter;

  total: HTMLElement | null;

  constructor() {
    this.total = document.querySelector<HTMLElement>(".js-products-count");

    this.init();
  }

  init() {
    document.addEventListener("init.products.filter", this.handleProductsFilterInit);
    document.addEventListener("init.products.list", this.handleProductsListInit);
    document.addEventListener("change.products.filter", this.handleProductsFilterChange);
  }

  handleProductsFilterChange = async (e: CustomEvent<{ params: string, name: string, value: string }>) => {
    const { detail: { params, name, value } } = e;

    this.filter.setFieldsetDisabled();
    await this.getProducts(params);
    this.filter.removeFieldsetDisabled();
    document.dispatchEvent(new CustomEvent("set.products.filter", {detail: { name, value }}));
  }

  handleProductsFilterInit = (e: CustomEvent<{filter: ProductsFilter}>) => {
    const { detail: { filter } } = e;

    this.filter = filter;
  }

  getProducts = async (params: string = "") => {
    try {
      const response = await axios.get<{
        products: ProductCardProps[],
        meta: ProductsFilterMeta,
        total: number,
        currentPage: number,
        totalPages: number,
      }>(`${PRODUCTS_API_URL}?${params}`);

      if (response.status === 200) {
        this.list?.render(response.data.products);

        for (const key in response.data.meta) {
          if (isValidKey(key, response.data.meta)) {
            this.filter[response.data.meta[key] > 0 ? "removeFieldDisabled" : "setFieldDisabled"](key);
          }
        }

        if (this.total) {
          this.total.textContent = pluralize(response.data.total, ["товар", "товара", "товаров"])
        }
      }
    } catch(e) {
      console.log(e);
    }
  }

  handleProductsListInit = async (e: CustomEvent<{list: ProductsList}>) => {
    const { detail: { list } } = e;
    
    this.list = list;

    this.getProducts(this.filter?.serialize() || '');
  }
}

export function initProductsController() {
  new ProductsController();
}