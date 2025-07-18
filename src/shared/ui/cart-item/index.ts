import "./styles.scss";
import "@icons/inc.svg";
import "@icons/dec.svg";
import "@icons/restore.svg";

import { ROOT_API_URL } from "@shared/config/api";

export type CartItemElement = HTMLElement & { cartItem?: CartItem };

export type CartItemProps  = {
  id: number,
  price: number,
  name: string,
  quantity: number,
  deleted_at: null | string;
  image: `/images/paints/paint-${number}.png`,
}

export class CartItem  {
  el: CartItemElement;
  count: HTMLElement | null;

  id: number;
  price: number;
  name: string;
  quantity: number;
  deleted_at: null | string;
  image: `/images/paints/paint-${number}.png`;
  
  constructor(el: CartItemElement, {
    id,
    price,
    name,
    quantity,
    image,
    deleted_at,
  }: CartItemProps) {
    this.el = el;
    this.id =  id;
    this.price =  price;
    this.name =  name;
    this.quantity = quantity;
    this.image = image;
    this.quantity = quantity;
    this.deleted_at = deleted_at;
    this.el.cartItem = this;

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

  static render = (props: CartItemProps ) => {
    const { id, price, image ,name, quantity, deleted_at } = props;
    const el = document.createElement("li");

    el.className = `cart-item js-cart-item${deleted_at ? " _deleted" : ""}`;
    el.setAttribute("data-prodict-id", id.toString());
    el.innerHTML = (`<div class="cart-item__image"><picture><img width="96" height="96" src="${ROOT_API_URL}${image}" alt="${ name }" class="cart-item__paint"></picture></div><div class="cart-item__info"><p class="cart-item__name">${ name }</p><p class="cart-item__price">${ new Intl.NumberFormat("ru-RU").format(price) } ₽</p></div><div class="cart-item__controls"><div class="cart-item__quantity"><button type="button" class="cart-item__quantity-btn js-cart-item-dec"><svg class="icon _fill-none" width="16" height="16"><use xlink:href="#dec"></use></svg></button><span class="cart-item__quantity-value js-cart-item-count">${ quantity }</span><button type="button" class="cart-item__quantity-btn js-cart-item-inc"><svg class="icon _fill-none" width="24" height="24"><use xlink:href="#inc"></use></svg></button></div>${deleted_at ? `<button type="button" class="cart-item__restore js-cart-item-restore"><svg class="icon _fill-none" width="24" height="24"><use xlink:href="#restore"></use></svg></button>`: `<button type="button" class="cart-item__remove js-cart-item-remove"><svg class="icon _fill-none" width="24" height="24"><use xlink:href="#cross"></use></svg></button>`}</div>`);

    return new CartItem(el, props);
  }
}