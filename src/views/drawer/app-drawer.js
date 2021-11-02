import { LitElement, html, css } from "lit";

//Redux
import { connect } from "pwa-helpers/connect-mixin";
import store from "../../redux/store";

import * as selectors from '../../redux/app/selectors';

import * as app from '../../redux/app';
import * as router from '../../redux/router'

//Dw Components
import '@dreamworld/dw-list-item/dw-list-item';
import '@dreamworld/dw-icon-button';

//Custom Components
import { DwSurface } from "../components/dw-surface";

export class AppDrawer extends connect(store)(DwSurface){

  static properties = {
    theme: {
      type: String,
      reflect: true,
    },
    opened: {
      type: Boolean,
      reflect: true,
      attribute: 'opened',
    },
    _page: {
      type: String,
    },
    _module: {
      type: String,
    },
    layout: {
      type: String,
      reflect: true,
    }
  }

  constructor(){
    super();
    this.opened = true;
    this._page;
  }

  static styles = [
    DwSurface.styles,
    css`
      :host{
        position: absolute;
        z-index: 4;
        overflow-y: auto;
        overflow-x: hidden;
        padding: 4px;
        width: var(--drawer-width);
        left: calc(var(--drawer-width) * -1.05);
        height: calc(100vh - 8px);
        margin: 4px;
        transition: left 0.7s;
      }

      :host([opened]){
        left:0;
      }

      :host([layout='mobile']){
        padding: 0;
        margin: 0;
        height: 100vh;
        border-radius: 0;
      }

      .header{
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      dw-switch{
        margin: 8px;
      }

      dw-icon-button{
        width: max-content;
        height: max-content;
      }

    `
  ]

  get _getContentTemplate(){
    return html`
      <div class="header">
        <dw-switch @change="${this._changeTheme}" ?checked="${this.theme==='dark' ? true : false}"></dw-switch>
        ${this._getCloseBtnView()}
      </div>
      <div class="body">
      <dw-list-item leadingIcon="home" title1='home' @click="${this._onPageChange}" ?selected=${this._isSelected('Home')}></dw-list-item>
      <dw-list-item leadingIcon="movie" title1='movies' @click="${this._onPageChange}" ?selected=${this._isSelected('Movies')}></dw-list-item>
      <dw-list-item leadingIcon="live_tv" title1='shows' @click="${this._onPageChange}" ?selected=${this._isSelected('Shows')}></dw-list-item>
      <dw-list-item leadingIcon="highlight_off" title1='not-found' @click="${this._onPageChange}" ?selected=${this._isSelected('NotFound')}></dw-list-item>
      </div>
      
    `;
  }

  _getCloseBtnView(){
    // return this.layout === 'desktop' 
    //   ? html `<dw-icon-button @click="${this._onDrawerClose}" icon="close"></dw-icon-button>`
    //   : html ``;

    return html `<dw-icon-button @click="${this._onDrawerClose}" icon="close"></dw-icon-button>`;
  }

  _onPageChange(e){
    if(this._page !== e.target.title1){
      router.navigatePage(e.target.title1, true);
    }
  }

  _changeTheme(e){
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    store.dispatch({
      type: 'themeChange',
      theme: this.theme,
    });
  }

  _isSelected(str){
    if(this._module === str){
      return true;
    }
    return false;
  }

  _onDrawerClose(e){
    store.dispatch({
      type: "drawerStatusChange",
      drawerOpened: false,
    })
  }

  stateChanged(state){
    this.theme = app.selectors.getCurrentTheme(state);
    this.opened = app.selectors.getDrawerStatus(state);
    this.layout = app.selectors.getLayout(state);
    this._page = router.selectors.currentPage(state);
    this._module = router.selectors.currentModule(state);
  }
}

window.customElements.define("app-drawer", AppDrawer);