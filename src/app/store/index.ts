import { Modal, ModalMethods } from "@features/modal";
import { Scrollbar } from "@shared/lib/scrollbar";
import { ProductCardElement } from "@shared/ui/ptoduct-card";
import { ILazyLoadInstance } from "vanilla-lazyload";

export interface IStore {
  lazyload?: ILazyLoadInstance;
  scrollbar?: Scrollbar;
  yandexMapDidInit?: boolean;
  modals: Modal[];
  modal?: ModalMethods; 
  scrollDirection: "down"| "up";
  products: {[key: number]: ProductCardElement};
  cart: {
    items: {[key: number]: number};
    initCartTriggers?: () => void;
  } ;
}

const store: IStore = {
  modals: [],
  products: [],
  cart: {
    items: {},
    
  },
  scrollDirection: "down",
};

export { store };
