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
        height: max-content;
        margin-right: 8px;
        margin-bottom: 8px;
        overflow: hidden;
        cursor: pointer;
      }

      img{
        width: auto;
        height: calc(150px * 1.5);
      }

      .details{
        padding: 16px 8px 16px;
        text-align: center;
      }

      h2{
        font-size: 1rem;
        margin: 0;
        width: 100%;
        overflow-wrap: break-word;
        font-weight: 700;
      }
    `
  ];

  static properties = {
    data: { type: Object },
    imageUrl: { type: String }
  }

  constructor() {
    super();
    this.elevation = 2;
    this.data;
    this.imageUrl;
    this.addEventListener('click', this.handleClick);
  }

  get _getContentTemplate() {
    let imageUrl = "".concat(this.imageUrl, this.data.poster_path);
    return html`
      <img src=${imageUrl} />
      <div class="details">
        <h2>${this.data.title}</h2>
      </div>
    `;
  }

  handleClick(e) {
    router.navigatePage("movies", { id: this.data.id }, false);
  }

  stateChanged(state) {
    i18next.changeLanguage(app.selectors.getLanguage(state));
    this.imageUrl = app.selectors.apiImageUrl(state);
  }
}

window.customElements.define("list-item", ListItem);