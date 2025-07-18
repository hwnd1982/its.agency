import { states } from "@shared/config/states";
import "./styles.scss";
import "@ui/ptoduct-card";

import { ProductCard, ProductCardElement, ProductCardProps } from "@ui/ptoduct-card";

interface CartItem {
  id: number;
  image: string;
  name: string;
  price: number;
  quantity: number;
}

export class ProductsList {
  el: HTMLElement;
  products: {[key: number]: ProductCardElement};
  productsIds: number[] = [];

  constructor(el: HTMLElement) {
    this.el = el;
    this.products = window.store.products;

    this.init();
  }


  init() {
    this.el.addEventListener("click", this.handleListClick);
    document.addEventListener("set.cart.state", this.handleCartStateSet);
    document.dispatchEvent(new CustomEvent("init.products.list", {detail: {list: this}}));
  }

  handleCartStateSet = () => {
    for (const id in this.products) {
      const count = window.store.cart.items[id] || 0;

      this.products[id].product.setCount(count);

      this.products[id].classList[count ? "add" : "remove"](states.cart)
    }
  }

  handleListClick = (e: Event) => {
    const { target } = e;
    
    if (target instanceof HTMLElement || target instanceof SVGElement) {
      const el = target.closest<ProductCardElement>(".js-product-item");

      if (el && el.product) {
        const control = target.closest<HTMLButtonElement>(".js-product-add");

        if (control) {
          this.addCartItem(el.product.id);
        }
      }
    }
  };

  addCartItem = (productId: number) => {
    document.dispatchEvent(
      new CustomEvent("set.cart.item", {
        detail: {
          productId,
          quantity: 1,
        },
      }),
    );
  }

  private createProductItem = (props: ProductCardProps) => {
    const el = document.createElement('li');

    el.className = "products-list__item js-product-item";
    el.setAttribute("data-prodict-id", props.id.toString());
    this.products[props.id] = el;
    this.productsIds.push(props.id);

    return el;
  }

  public render = (data: ProductCardProps[]) => {
    this.el.textContent = "";

    data.forEach(product => {
      this.el.append(this.products[product.id] ? 
        this.products[product.id] :
        this.createProductItem(product));

        ProductCard.render(this.products[product.id], product);
        window.store.cart.initCartTriggers();
    });
  }
}

export function initProductsList() {
  const el = document.querySelector<HTMLElement>(".js-products-list");

  if (el) {
    new ProductsList(el);
  }
}
