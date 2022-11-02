import { LitElement, html, css, CSSResultGroup } from "lit";
import { customElement, property } from "lit/decorators.js";

// Styles
// @ts-ignore
import { Shadow } from "@dreamworld/material-styles/shadow";

@customElement("dw-surface")
export class DwSurface extends LitElement {
  static styles?: CSSResultGroup | undefined = [
    Shadow,
    css`
      :host {
        display: block;
        outline: none;
        border-radius: 4px;
        background-color: var(--mdc-theme-surface, #fff);
        box-sizing: border-box;
        position: relative;
      }

      :host[hidden] {
        display: none;
      }

      /* STARTS: background color styles based on bg */
      :host([bg="primary"]) {
        background-color: var(--mdc-theme-primary);
      }

      :host([bg="secondary"]) {
        background-color: var(--mdc-theme-secondary);
      }

      :host([bg="error"]) {
        background-color: var(--mdc-theme-error);
      }
      /* ENDS: background color styles based on bg */

      /* STARTS: elevation styles based on elevation */
      :host([elevation="0"]) {
        box-shadow: var(--mdc-elevation--z0);
      }

      :host([elevation="1"]) {
        box-shadow: var(--mdc-elevation--z1);
      }

      :host([elevation="2"]) {
        box-shadow: var(--mdc-elevation--z2);
      }

      :host([elevation="3"]) {
        box-shadow: var(--mdc-elevation--z3);
      }

      :host([elevation="4"]) {
        box-shadow: var(--mdc-elevation--z4);
      }

      :host([elevation="6"]) {
        box-shadow: var(--mdc-elevation--z6);
      }

      :host([elevation="8"]) {
        box-shadow: var(--mdc-elevation--z8);
      }

      :host([elevation="12"]) {
        box-shadow: var(--mdc-elevation--z12);
      }

      :host([elevation="16"]) {
        box-shadow: var(--mdc-elevation--z16);
      }

      :host([elevation="24"]) {
        box-shadow: var(--mdc-elevation--z24);
      }
      /* ENDS: elevation styles based on elevation */

      /* STARTS: overlay styles for dark theme based on evevation */
      :host([elevation="1"]) .overlay {
        opacity: var(--dw-surface-overlay-opacitiy-elevation-1);
      }

      :host([elevation="2"]) .overlay {
        opacity: var(--dw-surface-overlay-opacitiy-elevation-2);
      }

      :host([elevation="3"]) .overlay {
        opacity: var(--dw-surface-overlay-opacitiy-elevation-3);
      }

      :host([elevation="4"]) .overlay {
        opacity: var(--dw-surface-overlay-opacitiy-elevation-4);
      }

      :host([elevation="6"]) .overlay {
        opacity: var(--dw-surface-overlay-opacitiy-elevation-6);
      }

      :host([elevation="8"]) .overlay {
        opacity: var(--dw-surface-overlay-opacitiy-elevation-8);
      }

      :host([elevation="12"]) .overlay {
        opacity: var(--dw-surface-overlay-opacitiy-elevation-12);
      }

      :host([elevation="16"]) .overlay {
        opacity: var(--dw-surface-overlay-opacitiy-elevation-16);
      }

      :host([elevation="24"]) .overlay {
        opacity: var(--dw-surface-overlay-opacitiy-elevation-24);
      }
      /* STARTS: overlay styles for dark theme based on evevation */

      .overlay {
        background-color: var(--dw-surface-overlay-color);
        opacity: 0;
        pointer-events: none;
      }

      .fit {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      }

      .scroller {
        display: inherit;
        flex: inherit;
        flex-direction: inherit;
        overflow: auto;
      }

      ::slotted(*) {
        z-index: 1;
      }
    `,
  ];

  /**
   * Specifies the background color
   * possible values: `surface`, `primary`, `secondary`, `error`
   * Default value is `surface`
   */
  @property({ type: String, reflect: true })
  bg: string = "surface";

  /**
   * The z-depth of the card. Default is `0`.
   */
  @property({ type: Number, reflect: true })
  elevation: number = 0;

  render() {
    return html`
      <div class="overlay fit"></div>
      <!-- <div class="fit"> -->
      <section class="scroller">${this._getContentTemplate}</section>
      <!-- </div> -->
    `;
  }

  get _getContentTemplate() {
    return html`<slot></slot>`;
  }
}
