import { LitElement, html, css } from "lit";

//Redux
import { connect } from "pwa-helpers/connect-mixin.js";
import { store } from "../../redux/store";

import api from "../../redux/api";

import * as typography from '@dreamworld/material-styles/typography';

import "@dreamworld/dw-icon";

export class AppHome extends connect(store)(LitElement){

  static styles = []

  static properties = {

  }

  constructor(){
    super();
    this.data;
  }

  render(){
    return this._getInitView();
  }

  _getInitView(){
    return html`Home Page`
  }

  stateChanged(state){
    this.data = api("/movie/popular", 2);
    console.log(this.data);
  }
}

window.customElements.define("app-home", AppHome);