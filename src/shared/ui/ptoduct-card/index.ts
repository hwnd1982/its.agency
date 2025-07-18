import "./styles.scss";
import "@icons/inc.svg";
import "@icons/cart.svg";
import "@icons/on-road.svg";

import { ROOT_API_URL } from "@shared/config/api";
import { states } from "@shared/config/states";

export type ProductCardElement = HTMLElement & { product?: ProductCard };

export type ProductCardProps  = {
  id: number,
  price: number,
  name: string,
  regular_price?: number, 
  quantity: number,
  color: string,
  image_interior: `/images/interiors/interior-${number}.png`,
  image_paint: `/images/paints/paint-${number}.png`,
  is_contract: 0 | 1,
  is_exclusive: 0 | 1,
  is_new: 0 | 1,
  is_sale: true,
}

export class ProductCard {
  el: ProductCardElement;
  count: HTMLElement | null;

  id: number;
  price: number;
  name: string;
  regular_price: number;
  quantity: number;
  color: string;
  image_interior: `/images/interiors/interior-${number}.png`;
  image_paint: `/images/paints/paint-${number}.png`;
  is_contract: 0 | 1;
  is_exclusive: 0 | 1;
  is_new: 0 | 1;
  is_sale: true;
  
  constructor(el: ProductCardElement, {
    id,
    price,
    name,
    regular_price,
    quantity,
    color,
    image_interior,
    image_paint,
    is_contract,
    is_exclusive,
    is_new,
    is_sale
  }: ProductCardProps) {
    this.el = el;
    this.id =  id;
    this.price =  price;
    this.name =  name;
    this.regular_price = regular_price;
    this.quantity = quantity;
    this.color = color;
    this.image_interior = image_interior;
    this.image_paint = image_paint;
    this.is_contract = is_contract;
    this.is_exclusive = is_exclusive;
    this.is_new = is_new;
    this.is_sale = is_sale;
    this.quantity = quantity;

    this.count = this.el.querySelector(".js-product-cart-count");
  }

  public setCount(count: number) {
    if (!this.count) {
      this.count = this.el.querySelector(".js-product-cart-count");
    }

    if (this.count) {
      this.count.textContent = count.toString();
    }
  }

  static render = (el: ProductCardElement, props: ProductCardProps ) => {
    const { id, price, image_paint, color, image_interior, regular_price,name, quantity } = props;
    
    el.classList[window.store.cart.items[id] ? "add" : "remove"](states.cart);
    el.innerHTML = (`<article class="product-card"><div class="product-card__images"><picture><img width="278" height="278" src="${ROOT_API_URL}${image_paint}" alt="${name}" class="product-card__paint"></picture><picture><img width="278" height="278" src="${ROOT_API_URL}${image_interior}" alt="${ name }" class="product-card__interrar" style="background-color: ${color}"></picture></div><h2 class="product-card__name"><a href="#${id}" class="product-card__link">${ name }</a></h2><div class="product-card__footer"><div class="product-card__prices"><p class="product-card__price">${ new Intl.NumberFormat("ru-RU").format(price) } ₽</p>${ (price < regular_price) ? `<p class="product-card__price">${ new Intl.NumberFormat("ru-RU").format(regular_price) } ₽</p>`: ""}</div>${quantity > 0 ? `<div class="product-card-controls product-card__controls"><button type="button" class="product-card-controls__inc js-product-add"><svg class="icon _fill-none" width="24" height="24"><use xlink:href="#inc"></use></svg></button><button type="button" class="product-card-controls__cart js-modal-trigger" data-modal-id="cart-modal"><span class="product-card-controls__cart-count js-product-cart-count">${window.store.cart.items[id] || 0}</span><svg class="icon _fill-none" width="24" height="24"><use xlink:href="#cart"></use></svg></button></div>` : `<span class="product-card-controls__on-road"><svg class="icon _fill-none" width="24" height="24"><use xlink:href="#on-road"></use></svg></span>`}</div></article>`);

    return el.product = new ProductCard(el, props);
  }
}