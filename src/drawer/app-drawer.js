import { LitElement, html, css } from "lit";

//Redux
import { connect } from "pwa-helpers/connect-mixin";
import store from "../redux/store";

import * as selectors from '../selectors/app';

//Dw Components
import '@dreamworld/dw-list-item/dw-list-item';
import '@dreamworld/dw-icon-button';

//Custom Components
import { DwSurface } from "../views/components/dw-surface";

import { STR_TV_SHOWS, STR_MOVIES, STR_NOT_FOUND } from "../redux/reducer";

export class AppDrawer extends connect(store)(DwSurface){

  static properties = {
    opened:{
      type: Boolean,
      reflect: true,
      attribute: 'opened',
    },
    activePage: {
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
    this.activePage;
  }

  static styles = [
    DwSurface.styles,
    css`
      :host{
        position: absolute;
        z-index: 9;
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
        justify-content: end;
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
        ${this._getCloseBtnView()}
      </div>
      <div class="body">
        <dw-list-item leadingIcon="movie" title1=${STR_MOVIES} @click="${this._onPageChange}" ?selected=${this._isSelected(STR_MOVIES)}></dw-list-item>
        <dw-list-item leadingIcon="live_tv" title1=${STR_TV_SHOWS} @click="${this._onPageChange}" ?selected=${this._isSelected(STR_TV_SHOWS)}></dw-list-item>
        <dw-list-item leadingIcon="highlight_off" title1=${STR_NOT_FOUND} @click="${this._onPageChange}" ?selected=${this._isSelected(STR_NOT_FOUND)}></dw-list-item>
      </div>
      
    `;
  }

  _getCloseBtnView(){
    return this.layout === 'desktop' 
      ? html `<dw-icon-button @click="${this._onDrawerClose}" icon="close"></dw-icon-button>`
      : html ``;
  }

  _onPageChange(e){
    if(this.activePage !== e.target.title1){
      store.dispatch({
        type: "pageChange",
        value: {
          page: e.target.title1,
          drawerOpened: this.layout === 'desktop',
        }
      })
    }
  }

  _isSelected(str){
    if(this.activePage === str){
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
    this.opened = selectors.drawerStatus(state);
    this.activePage = selectors.activePage(state);
    this.layout = selectors.getLayout(state);
  }
}

window.customElements.define("app-drawer", AppDrawer);