import { LitElement, html, css } from "lit";

//Redux
import { connect } from "pwa-helpers/connect-mixin.js";
import { store } from "../../redux/store";

import * as app from "../../redux/app";

//i18next
import i18next from "@dw/i18next-esm";
import localize from "../../component/localize";

import * as typography from "@dreamworld/material-styles/typography";

import "../components/my-loader";

export class AppHome extends connect(store)(localize(i18next)(LitElement)) {
  static styles = [
    css`
      :host {
        display: flex;
        flex: 1;
      }
    `,
  ];

  static properties = {};

  constructor() {
    super();
  }

  render() {
    return this._getInitView();
  }

  _getInitView() {
    return html`<my-loader></my-loader>`;
  }
}

window.customElements.define("app-home", AppHome);
