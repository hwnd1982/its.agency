import { CART_API_URL } from "@shared/config/api";
import { CartItemProps } from "@shared/ui/cart-item";
import { CartModal } from "@widgets/cart-modal";
import axios from "axios";

interface ICartData {
  cartId: string;
  items?: CartItemProps[];
  deletedItems: CartItemProps[];
  total: number;
}

interface IOrderData {
items: Omit<CartItemProps, "image" | "deleted_at">[]
cart: ICartData;
orderId: string;
success: boolean;
timestamp: string;
total: number;
}


class CartController {
  cartId?: string;
  cart?: CartModal;

  constructor() {
    this.init();
  }

  private init() {
    document.addEventListener("init.cart", this.handleCartInit);
    document.addEventListener("reset.cart", this.handleCartReset);
    document.addEventListener("checkout.cart", this.handleCartCheckout);
    
    document.addEventListener("set.cart.item", this.handleCartSet);
    document.addEventListener("remove.cart.item", this.handleCartRemove);
    document.addEventListener("restore.cart.item", this.handleCartRestore);
    
  }

  public setCartState = ({items, deletedItems}: ICartData) => {
    const cart = items.reduce<{[key: number]: number}>((cart, {id, quantity}) => {
      cart[id] = quantity;

      return cart;
    }, {});
    
    window.store.cart.items = cart;
    document.dispatchEvent(new CustomEvent("set.cart.state", {detail: {
      cart: items, 
      deleted: deletedItems 
    }}));
  }

  private handleCartRestore = async (e: CustomEvent<{ productId: number }>) => {
    if (!this.cartId) return;

    try {
      const { detail: { productId }} = e;
      const response = await axios.post<ICartData>(`${CART_API_URL}/${this.cartId}/items/${productId}/restore`);

      if (response.status === 200) {
        this.setCartState(response.data);
      }
    } catch(e) {
      console.log(e);
    }
  }

  private handleCartRemove = async (e: CustomEvent<{ productId: number }>) => {
    if (!this.cartId) return;

    try {
      const { detail: { productId }} = e;
      const response = await axios.delete<ICartData>(`${CART_API_URL}/${this.cartId}/items/${productId}`);

      if (response.status === 200) {
        this.setCartState(response.data);
      }
    } catch(e) {
      console.log(e);
    }
  }

  private handleCartSet = async (e: CustomEvent<{ productId: number, quantity: number }>) => {
    if (!this.cartId) return;

    try {
      const { detail: {productId, quantity}} = e;
      const response = await axios.post<ICartData>(`${CART_API_URL}/${this.cartId}/items`, {
        productId,
        quantity
      });

      if (response.status === 200) {
        this.setCartState(response.data);
      }
    } catch(e) {
      console.log(e);
    }
  }

  private handleCartCheckout = async () => {
    try {
      const response = await axios.post<IOrderData>(`${CART_API_URL}/${this.cartId}/checkout`);

      if (response.status === 200) {
        window.store.modal.openCustom({
          title: "Заказ оформлен", 
          description: `${
            response.data.items.map(item => `${item.name} - ${item.quantity}шт. - ${ new Intl.NumberFormat("ru-RU").format(item.quantity * item.price)} ₽`).join("<br>")}<br><br>ИТОГО: ${new Intl.NumberFormat("ru-RU").format(response.data.total)} ₽`})
        this.setCartState(response.data.cart);
      }
    } catch(e) {
      console.log(e);
    }
  }

  private handleCartReset = async () => {
    try {
      const response = await axios.delete<ICartData>(`${CART_API_URL}/${this.cartId}/clear`);

      if (response.status === 200) {
        this.setCartState(response.data);
      }
    } catch(e) {
      console.log(e);
    }
  }

  private handleCartInit = async (e: CustomEvent<{cart: CartModal}>) => {
    const {detail: { cart }} = e;
    
    this.cart = cart;
    this.cartId = localStorage.getItem("paint-cart-id") || null;

    try {
      const response = await axios[this.cartId ? "get" : "post"]<ICartData>(`${CART_API_URL}${this.cartId ? `/${this.cartId}` : ""}`);

      if (response.status === 200) {
        if (!this.cartId) {
          this.cartId = response.data.cartId;
          localStorage.setItem("paint-cart-id", response.data.cartId);
        }

        this.setCartState(response.data);
      }
    } catch(e) {
      console.log(e);
    }
  }
}

export function initCartController() {
  new CartController();
}
