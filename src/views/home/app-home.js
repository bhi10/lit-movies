import { LitElement, html, css } from "lit";

//Redux
import { connect } from "pwa-helpers/connect-mixin.js";
import store from "../../redux/store";

import * as typography from '@dreamworld/material-styles/typography';

import "@dreamworld/dw-icon";

export class AppHome extends connect(store)(LitElement){

  static styles = []

  static properties = {

  }

  constructor(){
    super();
  }

  render(){
    return this._getInitView();
  }

  _getInitView(){
    return html`Home Page`
  }

  stateChanged(state){

  }
}

window.customElements.define("app-home", AppHome);