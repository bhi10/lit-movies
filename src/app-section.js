import { LitElement, html, css } from "lit";

//Redux
import { connect } from "pwa-helpers/connect-mixin.js";
import store from './redux/store';

//Views
import './header/app-header';

import { STR_TV_SHOWS, STR_MOVIES } from "./redux/reducer";

import * as selectors  from "./selectors/app";

import Hammer from  "@dreamworld/hammerjs/hammer.js";

export class AppSection extends connect(store)(LitElement){

  static styles = css`
    :host{
      flex: 1;
    }

    .backdrop{
      flex: 1 1 0%;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 1;
      position: absolute;
      width: 100%;
      height: 100%;
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
    this._getSwipableDrawer;
  }

  _getInitView(){
    const backdrop = this.layout === 'mobile' && this.drawerOpened 
      ? html`<div class="backdrop" @click="${this._onDrawerToggel}"></div>` 
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

    if(this.page === STR_TV_SHOWS){
      import('./views/tv-shows/tv-shows.js');
      return html`<tv-shows></tv-shows>`;
    }

    if(this.page === STR_MOVIES){
      import('./views/movies/tmdb-movies');
      return html`<tmdb-movies></tmdb-movies>`;
    }
    
    return html``;
  }

  _onDrawerToggel(){
    store.dispatch({
      type: 'drawerStatusChange',
      drawerOpened: store.getState().drawerOpened ? false : true,
    });
  }

  get _getSwipableDrawer(){
    let hammerInstance = new Hammer(this);
    hammerInstance.get('swipe').set({ enable: true });

    hammerInstance.on('swipe', function(e){
      if(e.velocity > 0 && store.getState().drawerOpened === false && store.getState().layout === 'mobile'){
        store.dispatch({
          type: 'drawerStatusChange',
          drawerOpened: true,
        });
      }

      if(e.velocity < 0 && store.getState().drawerOpened && store.getState().layout === 'mobile'){
        store.dispatch({
          type: 'drawerStatusChange',
          drawerOpened: false,
        });
      }
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