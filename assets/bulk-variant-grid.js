/* Bulk order variant grid — adiciona múltiplas variantes com suas quantidades ao carrinho.
   Segue o mesmo padrão do ButtonSubmitBundle do tema (theme.js). */
(function () {
  if (customElements.get("bulk-variant-grid")) return;

  class BulkVariantGrid extends HTMLElement {
    constructor() {
      super();
      this.list = this.querySelector(".bulk-grid__list");
      this.submitButton = this.querySelector("[data-bulk-submit]");
      this.errorBox = this.querySelector("[data-bulk-error]");
      this.subtotalPrice = this.querySelector("[data-bulk-subtotal]");
      this.subtotalCount = this.querySelector("[data-bulk-count]");

      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
    }

    connectedCallback() {
      // Os quantity-input do tema disparam 'change' com bubbling.
      this.addEventListener("change", this.onChange);
      this.addEventListener("input", this.onChange);
      if (this.submitButton) {
        this.submitButton.addEventListener("click", this.onSubmit);
      }
      this.updateTotals();
    }

    disconnectedCallback() {
      this.removeEventListener("change", this.onChange);
      this.removeEventListener("input", this.onChange);
      if (this.submitButton) {
        this.submitButton.removeEventListener("click", this.onSubmit);
      }
    }

    get rows() {
      return Array.from(this.querySelectorAll(".bulk-grid__row"));
    }

    onChange(event) {
      if (!event.target.classList.contains("bulk-grid__qty")) return;
      this.hideError();
      this.updateTotals();
    }

    /* Lê cada linha e retorna os itens com quantidade > 0. */
    collectItems() {
      const items = [];
      let totalPrice = 0;
      let totalQty = 0;

      this.rows.forEach((row) => {
        const input = row.querySelector(".bulk-grid__qty");
        if (!input) return;
        const qty = parseInt(input.value, 10) || 0;
        if (qty <= 0) return;

        const id = row.getAttribute("data-variant-id");
        const price = parseInt(row.getAttribute("data-price"), 10) || 0;
        items.push({ id: id, quantity: qty });
        totalPrice += price * qty;
        totalQty += qty;
      });

      return { items: items, totalPrice: totalPrice, totalQty: totalQty };
    }

    updateTotals() {
      const { totalPrice, totalQty } = this.collectItems();
      if (this.subtotalCount) this.subtotalCount.textContent = totalQty;
      if (this.subtotalPrice) {
        const format =
          (window.cartStrings && window.cartStrings.money_format) ||
          (window.Shopify && window.Shopify.money_format);
        if (window.Shopify && typeof window.Shopify.formatMoney === "function") {
          this.subtotalPrice.textContent = window.Shopify.formatMoney(
            totalPrice,
            format
          );
        }
      }
    }

    onSubmit() {
      if (this.submitButton.classList.contains("loading")) return;

      const { items } = this.collectItems();
      if (!items.length) {
        this.showError(
          (window.variantStrings && window.variantStrings.chooseOptions) ||
            "Selecione a quantidade de pelo menos um modelo."
        );
        return;
      }

      this.setLoading(true);
      this.addItemsToCart(items);
    }

    addItemsToCart(items) {
      this.cart =
        document.querySelector("cart-notification") ||
        document.querySelector("cart-drawer");

      const formData = {
        items: items,
        sections: this.cart
          ? this.cart.getSectionsToRender().map((section) => section.id)
          : [],
        sections_url: window.location.pathname,
      };

      fetch(`${window.routes.cart_add_url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.status) {
            this.showError(response.description || response.message);
            return;
          }
          if (response.errors) {
            this.showError(response.errors);
            return;
          }

          this.updateCartCount();
          this.resetInputs();

          if (this.cart) {
            this.updateCartSections(response);
            this.cart.open();
          } else {
            window.location = window.routes.cart_url;
          }
        })
        .catch((error) => {
          this.showError(
            (window.cartStrings && window.cartStrings.error) ||
              "Erro ao adicionar ao carrinho."
          );
          console.error("bulk-variant-grid:", error);
        })
        .finally(() => {
          this.setLoading(false);
        });
    }

    updateCartCount() {
      fetch("/cart.json")
        .then((res) => res.json())
        .then((cart) => {
          if (cart.item_count === undefined) return;
          document.querySelectorAll(".cart-count").forEach((el) => {
            if (el.classList.contains("cart-count-drawer")) {
              el.innerHTML = `(${cart.item_count})`;
            } else {
              el.innerHTML = cart.item_count > 100 ? "~" : cart.item_count;
            }
          });

          const headerTotal = document.querySelector("header-total-price");
          if (headerTotal && typeof headerTotal.updateTotal === "function") {
            headerTotal.updateTotal(cart);
          }

          const cartFreeShip = document.querySelector("free-ship-progress-bar");
          if (cartFreeShip && typeof cartFreeShip.init === "function") {
            cartFreeShip.init(cart.items_subtotal_price);
          }

          if (
            window.GiftProgressBar &&
            typeof window.GiftProgressBar.scheduleSync === "function"
          ) {
            window.GiftProgressBar.scheduleSync();
          }
        })
        .catch((error) => console.error("Error updating cart count:", error));
    }

    updateCartSections(response) {
      if (!response.sections) return;
      this.cart.getSectionsToRender().forEach((section) => {
        const elementToReplace = document.getElementById(section.id);
        if (!elementToReplace || !response.sections[section.id]) return;
        const html = new DOMParser().parseFromString(
          response.sections[section.id],
          "text/html"
        );
        const source = html.querySelector("#minicart-form");
        if (source) elementToReplace.innerHTML = source.innerHTML;
      });

      if (this.cart && typeof this.cart.cartAction === "function") {
        this.cart.cartAction();
      }
    }

    resetInputs() {
      this.rows.forEach((row) => {
        const input = row.querySelector(".bulk-grid__qty");
        if (input) input.value = 0;
      });
      this.updateTotals();
    }

    setLoading(state) {
      if (!this.submitButton) return;
      const label = this.submitButton.querySelector("span");
      this.submitButton.classList.toggle("loading", state);
      if (state) {
        this.submitButton.setAttribute("disabled", "");
        this.defaultLabel = label ? label.textContent : "";
        if (label) {
          label.textContent =
            (window.variantStrings && window.variantStrings.addingToCart) ||
            "Adicionando...";
        }
      } else {
        this.submitButton.removeAttribute("disabled");
        if (label && this.defaultLabel) label.textContent = this.defaultLabel;
      }
    }

    showError(message) {
      if (!this.errorBox) return;
      this.errorBox.innerHTML = message;
      this.errorBox.removeAttribute("hidden");
    }

    hideError() {
      if (this.errorBox) this.errorBox.setAttribute("hidden", "");
    }
  }

  customElements.define("bulk-variant-grid", BulkVariantGrid);
})();
