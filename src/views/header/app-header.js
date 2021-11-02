import { LitElement, html, css } from "lit";

//Redux
import { connect } from "pwa-helpers/connect-mixin.js";
import store from "../../redux/store";

//Dw-Components
import '@dreamworld/dw-switch';
import '@dreamworld/dw-icon-button';

//Custom Components
import { DwSurface } from "../components/dw-surface";

import * as selectors  from "../../redux/app/selectors";

import * as app from "../../redux/app";
import * as router from "../../redux/router";

export class AppHeader extends connect(store)(DwSurface){

  static styles = [
    DwSurface.styles,
    css `

      :host([layout='mobile']){
        border-radius: 0px;
      }

      .header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        overflow: hidden;
      }

      .header div{
        display: flex;
        align-items: center;
      }

      dw-icon-button{
        width: max-content;
        height: max-content;
      }

      .title{
        flex: 1;
      }

      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        cursor: pointer;
        object-fit: cover;
      } 
    `
  ];

  static properties = {
    page: {
      type: String
    },    
    layout: {
      type: String,
      reflect: true,
    }
  }

  constructor(){
    super();
  }

  get _getContentTemplate(){

    return html`
      <div class="header">
        <div class="title">
          <dw-icon-button @click="${this._onDrawerToggel}" icon="menu"></dw-icon-button>
          <h4>${this.page}</h4>
        </div>
        <img @click="${this._onClickProfile}" src="src/img/page-not-found.png">
      </div>

      
    `
  }

  _onClickProfile(e){
    console.log(e.target)
  }

  _onDrawerToggel(e){
    store.dispatch({
      type: 'drawerStatusChange',
      drawerOpened: store.getState().app.drawerOpened ? false : true,
    });
  }

  stateChanged(state){
    this.page = router.selectors.currentModule(state);
    this.layout = app.selectors.getLayout(state);
  }
}

window.customElements.define("app-header", AppHeader);