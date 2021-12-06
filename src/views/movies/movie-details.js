import { LitElement, html, css } from "lit";

//Redux
import { connect } from "pwa-helpers/connect-mixin.js";
import { store } from "../../redux/store";

//i18next
import i18next from '@dw/i18next-esm';
import { localize } from '@dw/pwa-helpers';

import * as router from './../../redux/router';
import * as app from './../../redux/app';

import api from "../../redux/api";

export class MovieDetails extends connect(store)(localize(i18next)(LitElement)) {

  static styles = [
    css`

    `
  ];

  static properties = {
    _id: { type: String },
    _data: { type: Object }
  }

  constructor() {
    super();
    this.imageUrl;
    this._getData();
  }

  render() {
    console.log(this._data);
    return this._getInitView();
  }

  connectedCallback() {
    super.connectedCallback();
    this._getData();
  }

  _getInitView() {

    if (this._data !== undefined) {
      let imageUrl = "".concat(this.imageUrl, this._data.poster_path);

      return html`
        <img src=${imageUrl}>
      `;
    }

    return html`Loading...`;

  }

  _getData() {
    if (this._id !== undefined) {
      api("/movie/" + this._id, 1)
        .then(res => this._data = res)
    }

  }

  stateChanged(state) {
    this._id = router.selectors.currentId(state);
    this.imageUrl = app.selectors.apiImageUrl(state);
    i18next.changeLanguage(app.selectors.getLanguage(state));
  }
}

window.customElements.define("movie-details", MovieDetails);