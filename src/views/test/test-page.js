import { LitElement, html, css } from "lit";

//Redux
import { connect } from "pwa-helpers/connect-mixin.js";
import { store } from "../../redux/store";

import * as app from "../../redux/app";
import * as router from "../../redux/router";
import api from "../../redux/api";

//i18next
import i18next from '@dw/i18next-esm';
import { localize } from '@dw/pwa-helpers';

//components
import "./test-element";

export class TestPage extends connect(store)(localize(i18next)(LitElement)){
  static styles = [
    css`
      :host{
        display: flex;
        flex: 1;
        flex-wrap: wrap;
        justify-content: start
      }
    `
  ]

  static properties = {

  }

  constructor(){
    super();
  }

  render(){
    return this._getInitView();
  }

  _getInitView(){
    return html`
      <test-element></test-element>
      <test-element></test-element>
      <test-element></test-element>
      <test-element></test-element>
    `;
  }

  stateChanged(state){

  }
}

window.customElements.define("test-page", TestPage)