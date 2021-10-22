import { LitElement, html, css } from "lit";

// Material Theme
import { ThemeStyle } from '@dreamworld/material-styles/theme.js';

//Redux
import { connect } from "pwa-helpers/connect-mixin.js";
import store from './redux/store';

//Views
import './drawer/app-drawer';
import './app-section';

//DreamWorld Hammerjs
import Hammer from  "@dreamworld/hammerjs/hammer.js";

import * as selectors  from "./selectors/app";

export class TmdbApp extends connect(store)(LitElement){

  static properties = {
    theme: {
      type: String,
      reflect: true,
    },
    dark: {
      type: Boolean,
      reflect: true,
      attribute: 'dark-theme',
    },
  }

  constructor(){
    super();
    this.theme;
    this.dark;
  }

  static styles = [
    ThemeStyle,
    css`

      :host{
        color: var(--mdc-theme-text-primary);
        background-color: var(--mdc-theme-background);
        display: flex;
        flex: 1;
      }
    `
  ];
  

  render(){
    return this._initView();
  }

  _initView(){
    return html`
      <app-drawer elevation=4></app-drawer>
      <app-section></app-section>
      `
  }

  firstUpdated(){
    super.firstUpdated();
    this._getSwipableDrawer;
  }

  get _getSwipableDrawer(){
    let hammerInstance = new Hammer(document.body);
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
    this.theme = selectors.currentTheme(state);
    this.dark = this.theme === 'dark' ? true : false;
  }
}

window.customElements.define('tmdb-app', TmdbApp);