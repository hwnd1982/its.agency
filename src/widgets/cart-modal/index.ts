import "./styles.scss";
import "@features/modal";
import "@ui/cart-item";
import { ModalElement } from "@features/modal";
import { CartItem, CartItemProps } from "@ui/cart-item";
import { pluralize } from "@shared/lib/pluralize";


export class CartModal {
  modal: ModalElement;
  list: HTMLElement | null;
  countEls: NodeListOf<HTMLElement>;
  totalCostEl: HTMLElement | null;
  reset: HTMLButtonElement | null;
  checkout: HTMLButtonElement | null;

  state: CartItemProps[] = [];
  deleted: CartItemProps[] = [];
  
  constructor (el: ModalElement) {
    this.modal = el;

    this.countEls = document.querySelectorAll<HTMLElement>(".js-cart-count");
    this.totalCostEl = this.modal.querySelector<HTMLElement>(".js-cart-total-cost");
    this.list = this.modal.querySelector<HTMLElement>(".js-cart-list");
    this.reset = this.modal.querySelector<HTMLButtonElement>(".js-cart-reset");
    this.checkout = this.modal.querySelector<HTMLButtonElement>(".js-cart-checkout");
    
    this.init();
  }

  init() {
    this.modal.addEventListener("beforeOpen", () => {});
    this.list?.addEventListener("click", this.handleListClick)
    document.addEventListener("set.cart.state", this.handleCartStateSet);
    document.dispatchEvent(new CustomEvent("init.cart", {detail: {cart: this}}));
    this.reset?.addEventListener("click", this.handleReset);
    this.checkout?.addEventListener("click", this.handleCheckout);
  }

  public get total() {
    return this.state.reduce(({count, cost}, {quantity, price}) => 
      ({count: count += quantity, cost: cost += quantity * price}), {count: 0, cost: 0});
  }

  setDisabled = () => {
    this.checkout.setAttribute("disabled", "");
    this.reset.setAttribute("disabled", "");
  }

  removeDisabled = () => {
    this.checkout.removeAttribute("disabled");
    this.reset.removeAttribute("disabled");
  }

  private handleCheckout = () => {
    this.modal.modal?.close();
    document.dispatchEvent(new CustomEvent("checkout.cart"));
  }

  private handleReset = () => {
    this.modal.modal?.close();
    document.dispatchEvent(new CustomEvent("reset.cart"));
  }

  private handleListClick = ({ target }: Event) => {
    if (target instanceof HTMLElement || target instanceof SVGElement) {
      const item = target.closest<HTMLButtonElement>(".js-cart-item");
      const remove = target.closest<HTMLButtonElement>(".js-cart-item-remove");
      const restore = target.closest<HTMLButtonElement>(".js-cart-item-restore");
      const control = target.closest<HTMLElement>(".js-cart-item-dec, .js-cart-item-inc");
      const inc = item.querySelector<HTMLElement>(".js-cart-item-inc");
      
      if (item) {
        const productId = item.getAttribute("data-prodict-id");

        if (productId === undefined) return;

        if (remove) {
          return document.dispatchEvent(new CustomEvent("remove.cart.item", { detail: { productId } }));
        }

        if (restore) {
          return document.dispatchEvent(new CustomEvent("restore.cart.item", { detail: { productId } }));
        }

        if (control) {
          const quantity = window.store.cart.items[+productId] + [, inc].indexOf(control);

          return document.dispatchEvent(new CustomEvent("set.cart.item", { detail: { productId, quantity } }));
        }
      }

    }
  }

  private handleCartStateSet = (e: CustomEvent< {cart: CartItemProps[], deleted: CartItemProps[]}>) => {
    const {detail: { cart, deleted }} = e;

    cart.length ? this.removeDisabled() : this.setDisabled();

    this.state = cart;
    this.deleted = deleted;

    this.render();
  }

  public render() {
    const { cost, count } = this.total;

    this.totalCostEl.textContent = `${ new Intl.NumberFormat("ru-RU").format(cost) } ₽`
    this.countEls.forEach(el => {
      const value = el instanceof HTMLButtonElement ? count.toString() : pluralize(count, ['товар', 'товара', 'товаров']);
      
      el.textContent = value;
    });

    this.list.textContent = "";
    this.state.forEach(item => {
      this.list.append(CartItem.render(item).el);        
    });
    this.deleted?.forEach(item => {
      this.list.append(CartItem.render(item).el);        
    });
  }
}

export function initCartModal () {
  const el = document.querySelector<ModalElement>('.js-modal[data-modal-id="cart-modal"]');
  
  if (el) {
    const cartModal = new CartModal(el);

    window.store.cart.initCartTriggers = cartModal.modal.modal.initTriggers
  }
}