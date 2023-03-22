/* playground-fold */
import { LitElement, html, noChange, css } from "lit";
import { animate } from "@lit-labs/motion";
import { styleMap } from "lit/directives/style-map.js";

export class MotionCarousel extends LitElement {
  static properties = {
    selected: { type: Number },
  };
  static styles = css`
    :host {
      display: inline-block;
      overflow: hidden;
      position: relative;
      /* Defaults */
      height: 500px;
      border-radius: 4px;
      background: gainsboro;
      cursor: pointer;
    }

    .fit {
      position: relative;
      height: 100%;
      width: 100%;
    }

    .selected {
      top: -100%;
    }

    ::slotted(*) {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
    }

    .bar {
      position: absolute;
      bottom: 8px;
      width: calc(100% - 16px);
      left: 8px;
      height: 8px;
      background: rgba(200, 200, 200, 0.5);
      border-radius: 8px;
      pointer-events: none;
    }

    .indicator {
      position: relative;
      display: inline-block;
      height: 100%;
      width: 8px;
      border-radius: 8px;
      background: #eee;
    }
  `;

  constructor() {
    super();
    this.selected = 0;
  }

  get selectedSlot() {
    return (this.__selectedSlot ??=
      this.renderRoot?.querySelector('slot[name="selected"]') ?? null);
  }

  get previousSlot() {
    return (this.__previousSlot ??=
      this.renderRoot?.querySelector('slot[name="previous"]') ?? null);
  }

  left = 0;
  selectedInternal = 0;

  get maxSelected() {
    return this.childElementCount - 1;
  }

  hasValidSelected() {
    return this.selected >= 0 && this.selected <= this.maxSelected;
  }

  render() {
    const p = this.selectedInternal;
    const s = (this.selectedInternal = this.hasValidSelected()
      ? this.selected
      : this.selectedInternal);
    const shouldMove = this.hasUpdated && s !== p;
    const atStart = p === 0;
    const toStart = s === 0;
    const atEnd = p === this.maxSelected;
    const toEnd = s == this.maxSelected;
    const shouldAdvance =
      shouldMove && (atEnd ? toStart : atStart ? !toEnd : s > p);
    const delta = (shouldMove ? Number(shouldAdvance) || -1 : 0) * 100;
    this.left -= delta;
    const animateLeft = `${this.left}%`;
    const selectedLeft = `${-this.left}%`;
    const previousLeft = `${-this.left - delta}%`;
    const w = 100 / this.childElementCount;
    const indicatorLeft = `${w * s}%`;
    const indicatorWidth = `${w}%`;
    return html`
      <div
        class="fit"
        ${animate()}
        @click=${this.clickHandler}
        style=${styleMap({ left: animateLeft })}
      >
        <div
          class="fit"
          style=${shouldMove ? styleMap({ left: previousLeft }) : noChange}
        >
          <slot name="previous"></slot>
        </div>
        <div
          class="fit selected"
          style=${shouldMove ? styleMap({ left: selectedLeft }) : noChange}
        >
          <slot name="selected"></slot>
        </div>
      </div>
      <div class="bar">
        <div
          class="indicator"
          ${animate()}
          style=${styleMap({
            left: indicatorLeft,
            width: indicatorWidth,
          })}
        ></div>
      </div>
    `;
  }

  previous = -1;
  async updated(changedProperties) {
    if (
      (changedProperties.has("selected") || this.previous === -1) &&
      this.hasValidSelected()
    ) {
      this.updateSlots();
      this.previous = this.selected;
    }
  }

  updateSlots() {
    // unset old slot state
    this.selectedSlot.assignedElements()[0]?.removeAttribute("slot");
    this.previousSlot.assignedElements()[0]?.removeAttribute("slot");
    // set slots
    this.children[this.previous]?.setAttribute("slot", "previous");
    this.children[this.selected]?.setAttribute("slot", "selected");
  }

  clickHandler(e) {
    const i = this.selected + (Number(!e.shiftKey) || -1);
    this.selected = i > this.maxSelected ? 0 : i < 0 ? this.maxSelected : i;
    const change = new CustomEvent("change", {
      detail: this.selected,
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(change);
  }
}
customElements.define("motion-carousel", MotionCarousel);
/* playground-fold-end */
