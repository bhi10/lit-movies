import { LitElement, html, css } from "lit";

//Redux
import { connect } from "pwa-helpers/connect-mixin.js";
import store from './redux/store';

//Views
import './views/header/app-header';

import { STR_TV_SHOWS, STR_MOVIES, STR_NOT_FOUND, STR_HOME } from "./redux/reducer";

import * as selectors  from "./selectors/app";

export class AppSection extends connect(store)(LitElement){

  static styles = css`
    :host{
      flex: 1;
      display: flex;
    }

    .backdrop{
      flex: 1 1 0%;
      background-color: rgba(0, 0, 0, 0);
      z-index: -9;
      position: absolute;
      width: 100%;
      height: 100%;
      transition: background-color 0.7s;
    }

    .backdrop[opened]{
      background-color: rgba(0, 0, 0, 0.8);
      z-index: 5;
    }

    .section{
      flex: 1;
      position: relative;
      display: flex;
      flex-direction: column;
      transition: margin-left 0.7s;
    }

    :host([layout='desktop']) .section{
      padding: 4px;
    }

    :host([layout='desktop']) .section[opened]{
      margin-left: calc(var(--drawer-width) + 8px);
    }

    .body{
      display: flex;
      flex: 1;
    }
  `;

  static properties = {
    layout: {
      type: String,
      reflect: true,
    },
    drawerOpened: {
      type: String
    },
    page: {
      type: String
    },
  }

  constructor(){
    super();
  }

  render(){
    return this._getInitView();
  }

  firstUpdated(){
    super.firstUpdated();
  }

  _getInitView(){
    const backdrop = this.layout === 'mobile'  
      ? html`<div class="backdrop" @click="${this._onDrawerToggel}" ?opened=${this.drawerOpened}></div>` 
      : html``;

    const section = html`
      ${backdrop}
      <div class="section" ?opened=${this.drawerOpened}>
        <app-header elevation=1></app-header>
        <div class="body">
          ${this._getPageView()}
        </div>
      </div>
    `;
    
    return section;
  }

  _getPageView(){

    if(this.page === STR_HOME){
      import('./views//home/app-home');
      return html`<app-home></app-home>`
    }

    if(this.page === STR_TV_SHOWS){
      import('./views/tv-shows/tv-shows.js');
      return html`<tv-shows></tv-shows>`;
    }

    if(this.page === STR_MOVIES){
      import('./views/movies/app-movies');
      return html`<tmdb-movies></tmdb-movies>`;
    }
    
    if(this.page === STR_NOT_FOUND){
      import('./views/not-found');
      return html`<not-found></not-found>`
    }

    return html``;
  }

  _onDrawerToggel(){
    store.dispatch({
      type: 'drawerStatusChange',
      drawerOpened: store.getState().drawerOpened ? false : true,
    });
  }

  stateChanged(state){
    this.layout = selectors.getLayout(state);
    this.drawerOpened = selectors.drawerStatus(state);
    this.page = selectors.activePage(state);

    console.log(state);
  }
}

window.customElements.define("app-section", AppSection);