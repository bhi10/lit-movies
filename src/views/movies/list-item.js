import { html, css } from "lit";

import { DwSurface } from "../components/dw-surface";

//Redux
import { connect } from "pwa-helpers/connect-mixin.js";
import { store } from "../../redux/store";

//i18next
import i18next from '@dw/i18next-esm';
import { localize } from '@dw/pwa-helpers';

//selectors
import * as app from "../../redux/app";
import * as router from '../../redux/router';

export class ListItem extends connect(store)(localize(i18next)(DwSurface)) {
  static styles = [
    DwSurface.styles,
    css`
      :host{
        width: min-content;
        height: 100%;
        overflow: hidden;
        cursor: pointer;
        transition: transform 0.5s ease-in-out;
      }

      :host(:hover){
        transform: scale(1.05);
        box-shadow: var(--mdc-elevation--z8);
        z-index: 1;
      }

      ::slotted(img){
        width: auto;
        height: 256px;
      }

      .details{
        padding: 16px 8px 16px;
        text-align: center;
      }

      ::slotted(h2){
        font-size: 1rem;
        margin: 0;
        width: 100%;
        overflow-wrap: break-word;
        font-weight: 700;
      }

      ::slotted(h3){
        font-size: 0.75rem;
        width: 100%;
        overflow-wrap: break-word;
        font-weight: 600;
        margin: 0;
        margin-top: 8px;
      }
    `
  ];

  static properties = {
    id: {
      type: Number,
      reflect: true
    },
    redirect: {
      type: String
    }
  }

  constructor() {
    super();
    this.elevation = 2;
    this.addEventListener('click', this.handleClick);
  }

  get _getContentTemplate() {
    return html`
      <slot name="image"></slot>
      <div class="details">
        <slot name="title1"></slot>
        <slot name="title2"></slot>
      </div>
    `;
  }

  handleClick(e) {
    router.navigatePage(this.redirect, { id: this.id }, false);
  }

  stateChanged(state) {
    i18next.changeLanguage(app.selectors.getLanguage(state));
  }
}

window.customElements.define("list-item", ListItem);