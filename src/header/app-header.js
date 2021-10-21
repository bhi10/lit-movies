import { LitElement, html, css } from "lit";

//Redux
import { connect } from "pwa-helpers/connect-mixin.js";
import store from "../redux/store";

//Dw-Components
import '@dreamworld/dw-switch';
import '@dreamworld/dw-icon-button';

//Custom Components
import { DwSurface } from "../views/components/dw-surface";

import * as selectors  from "../selectors/app";

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

      dw-switch{
        margin-right: 10px;
      }
    `
  ];

  static properties = {
    theme: {
      type: String,
      reflect: true,
    },
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
        <div>
          <dw-icon-button @click="${this._onDrawerToggel}" icon="menu"></dw-icon-button>
          <h4>${this.page}</h4>
        </div>
        <dw-switch @change="${this._changeTheme}" ?checked="${this.theme==='dark' ? true : false}"></dw-switch>
      </div>
    `
  }

  _changeTheme(e){
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    store.dispatch({
      type: 'themeChange',
      theme: this.theme,
    });
  }

  _onDrawerToggel(e){
    store.dispatch({
      type: 'drawerStatusChange',
      drawerOpened: store.getState().drawerOpened ? false : true,
    });
  }

  stateChanged(state){
    this.theme = selectors.currentTheme(state);
    this.page = selectors.activePage(state);
    this.layout = selectors.getLayout(state);
  }
}

window.customElements.define("app-header", AppHeader);