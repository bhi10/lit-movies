import { LitElement, html, css } from "lit";

//Redux
import { connect } from "pwa-helpers/connect-mixin.js";
import store from '../redux/store';

//Dw Components
import '@dreamworld/dw-button';

import { STR_HOME } from "../redux/reducer";

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
      <img src="src/img/page-not-found.png">
      <h3>Page Not Found</h3>
      <dw-button label="Go Home" raised @click="${this._goHome}"></dw-button>
      `;
  }

  _goHome(){
    store.dispatch({
      type: "pageChange",
      value: {
        page: STR_HOME,
        drawerOpened: store.getState().drawerOpened
      }
    });
  }

  stateChanged(state){

  }
}

window.customElements.define("not-found", NotFound);