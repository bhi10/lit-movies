import { LitElement, html, css } from "lit";

// Material Theme
import { ThemeStyle } from '@dreamworld/material-styles/theme.js';

//Redux
import { connect } from "pwa-helpers/connect-mixin.js";
import store from './redux/store';

//Views
import './drawer/app-drawer';
import './app-section';

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
    //this._appDrawer;
  }

  get _appDrawer(){
    let appDrawer = this.renderRoot.querySelector('app-drawer');
    let hammerInstance = new Hammer(appDrawer);
    hammerInstance.get('swipe').set({ enable: true });

    hammerInstance.on('swipe', function(e){
      console.log(e);
    });
  }

  stateChanged(state){
    this.theme = selectors.currentTheme(state);
    this.dark = this.theme === 'dark' ? true : false;
  }
}

window.customElements.define('tmdb-app', TmdbApp);