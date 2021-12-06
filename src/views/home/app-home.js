import { LitElement, html, css } from "lit";

//Redux
import { connect } from "pwa-helpers/connect-mixin.js";
import { store } from "../../redux/store";

import * as app from "../../redux/app";

//i18next
import i18next from '@dw/i18next-esm';
import { localize } from '@dw/pwa-helpers';

//custom element
import "../components/list-container";

import api from "../../redux/api";

import * as typography from '@dreamworld/material-styles/typography';

import "@dreamworld/dw-icon";

export class AppHome extends connect(store)(localize(i18next)(LitElement)) {

  static styles = [
    css`
      :host{
        display: flex;
        flex: 1;
      }

      h2{
        margin:0;
        margin-bottom: 8px;
      }
    `
  ]

  static properties = {
    data: {
      type: Object
    }
  }

  constructor() {
    super();
    this.data;
  }

  render() {
    return this._getInitView();
  }

  _getInitView() {
    if (this.data !== undefined) {
      return html`
        <div>
          <h2>Popular Movies</h2>
          <list-container .dataSet=${this.data.results}></list-container>
        </div>
      `
    } else {
      return html`Loading...`
    }

  }

  firstUpdated() {
    super.firstUpdated();
    this._getPopularMovies();
  }

  _getPopularMovies() {
    let promise = api("/movie/popular", 1)
      .then(res => this.data = res);
  }

  stateChanged(state) {
    i18next.changeLanguage(app.selectors.getLanguage(state));
  }
}

window.customElements.define("app-home", AppHome);