// Trilho horizontal de subcoleções: setas rolam ~1 "página" e são desativadas nas pontas.
// A rolagem em si é nativa (overflow + scroll-snap), então funciona sem JS no mobile.
if (!customElements.get('subcollection-rail')) {
  class SubcollectionRail extends HTMLElement {
    connectedCallback() {
      this.track = this.querySelector('.subcol-rail__track');
      this.prev = this.querySelector('.subcol-rail__arrow--prev');
      this.next = this.querySelector('.subcol-rail__arrow--next');
      if (!this.track) return;

      this.update = this.update.bind(this);
      this.prev?.addEventListener('click', () => this.scrollByPage(-1));
      this.next?.addEventListener('click', () => this.scrollByPage(1));
      this.track.addEventListener('scroll', this.update, { passive: true });
      this.resizeObserver = new ResizeObserver(this.update);
      this.resizeObserver.observe(this.track);
      this.update();
    }

    disconnectedCallback() {
      this.track?.removeEventListener('scroll', this.update);
      this.resizeObserver?.disconnect();
    }

    scrollByPage(direction) {
      this.track.scrollBy({ left: direction * this.track.clientWidth * 0.8, behavior: 'smooth' });
    }

    update() {
      const { scrollLeft, scrollWidth, clientWidth } = this.track;
      const scrollable = scrollWidth - clientWidth > 2;
      this.classList.toggle('is-scrollable', scrollable);
      if (this.prev) this.prev.disabled = scrollLeft <= 2;
      if (this.next) this.next.disabled = scrollLeft + clientWidth >= scrollWidth - 2;
    }
  }

  customElements.define('subcollection-rail', SubcollectionRail);
}
