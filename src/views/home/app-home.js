import { LitElement, html, css } from "lit";

//Redux
import { connect } from "pwa-helpers/connect-mixin.js";
import store from "../../redux/store";

export class AppHome extends connect(store)(LitElement){

  static styles = css``;

  static properties = {

  }

  constructor(){
    super();
  }

  render(){
    return this._getInitView();
  }

  _getInitView(){
    return html`<h1>Home Page</h1>`
  }

  stateChanged(state){

  }
}

window.customElements.define("app-home", AppHome);