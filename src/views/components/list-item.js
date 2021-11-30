import { html, css } from "lit";

import { DwSurface } from "./dw-surface";

//Redux
import { connect } from "pwa-helpers/connect-mixin.js";
import { store } from "../../redux/store";

//i18next
import i18next from '@dw/i18next-esm';
import { localize } from '@dw/pwa-helpers';

//selectors
import * as app from "../../redux/app";

export class ListItem extends connect(store)(localize(i18next)(DwSurface)){
  static styles = [
    DwSurface.styles,
    css`
      :host{
        width: auto;
        height: calc(225px);
        margin-right: 8px;
        margin-bottom: 8px;
      }

      img{
        width: auto;
        height: calc(150px * 1.5);
      }
    `
  ];

  static properties = {
    data: {type: Object},
    imageUrl: {type: String}
  }

  constructor(){
    super();
    this.elevation = 2;
    this.data;
    this.imageUrl;
  }

  get _getContentTemplate(){
    let imageUrl = "".concat(this.imageUrl, this.data.poster_path);
    return html`
      <img src=${imageUrl} />
    `;
  }

  stateChanged(state){
    i18next.changeLanguage(app.selectors.getLanguage(state));
    this.imageUrl = app.selectors.apiImageUrl(state);
  }
}

window.customElements.define("list-item", ListItem);