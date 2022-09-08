import { LitElement, html, css } from "lit";

//Redux
import { connect } from "pwa-helpers/connect-mixin.js";
import {store} from '../redux/store';

//Dw Components
import '@material/mwc-button';

import * as router from '../redux/router';

export class NotFound extends connect(store)(LitElement){

  static styles = css`

    :host{
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    img{
      width: 100%;
      max-width: 450px;
    }
  `;

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
      <img src="src/img/not-found/page-not-found.png">
      <h3>Page Not Found</h3>
      <mwc-button label="Go Home" raised @click="${this._goHome}"></mwc-button>
      `;
  }

  _goHome(){
    router.navigatePage("home", true);
  }

  stateChanged(state){

  }
}

window.customElements.define("not-found", NotFound);