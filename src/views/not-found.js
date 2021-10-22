import { LitElement, html, css } from "lit";

//Redux
import { connect } from "pwa-helpers/connect-mixin.js";
import store from '../redux/store';

export class NotFound extends connect(store)(LitElement){

  static styles = css`

    :host{
      flex: 1;
      display: flex;
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
    return html`<img src="src/img/page-not-found.png">`;
  }

  stateChanged(state){

  }
}

window.customElements.define("not-found", NotFound);