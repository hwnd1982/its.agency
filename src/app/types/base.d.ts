import { IStore } from '@app/store';

export interface IWindowEndpoints {}

declare global {
  interface Window {
    store: IStore;
  }
}
