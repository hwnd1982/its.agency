import "./styles.scss";
import "@ui/switcher";

export class ProductsFilter {
  form: HTMLFormElement;
  fieldset: HTMLFieldSetElement | null;

  

  constructor(form: HTMLFormElement) {
    this.form = form;
    this.fieldset = form.querySelector(".js-filter-fieldset");
    this.init();
  }

  init() {
    this.form.addEventListener("change", this.handleFilterChenge);
    document.dispatchEvent(new CustomEvent("init.products.filter", { detail: { filter: this } }));
  }

  public setFieldDisabled = (name: string) => {
    const input = this.form.elements.namedItem(name);

    if (input instanceof HTMLInputElement) {
      input.setAttribute("disabled", "");
    }
  }

  public removeFieldDisabled = (name: string) => {
    const input = this.form.elements.namedItem(name);

    if (input instanceof HTMLInputElement) {
      input.removeAttribute("disabled");
    }
  }

  public setFieldsetDisabled = () => {
    this.fieldset?.setAttribute("disabled", "");
  }

  public removeFieldsetDisabled = () => {
    this.fieldset?.removeAttribute("disabled");
  }

  public serialize = () => {
    if (this.form) {
      const formData = new FormData(this.form);
      const convertedFormEntries = Array.from(formData, ([key, value]) => [
        key,
        typeof value === "string" ? value : value.name,
      ]).filter(([, value]) => value);

      return new URLSearchParams(convertedFormEntries).toString();
    }
  };

  private handleFilterChenge = (e: Event) => {
    const { target } = e;
    

    if (target instanceof HTMLInputElement) {
      const { name, value, checked } = target;
      
      document.dispatchEvent(new CustomEvent("change.products.filter", { detail: { params: this.serialize(), name, value, checked } }));
    }
  };
}

export function initProductsFilter() {
  const form = document.querySelector<HTMLFormElement>(".js-products-filter");

  if (form) {
    new ProductsFilter(form);
  }
}
