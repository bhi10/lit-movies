import { LitElement, html, css } from "lit";

// Material Theme
import { ThemeStyle } from '@dreamworld/material-styles/theme.js';

//Redux
import { connect } from "pwa-helpers/connect-mixin.js";
import store from './redux/store';

//Views
import './views/drawer/app-drawer';
import './app-section';

//i18next
import i18next from '@dw/i18next-esm';
import Backend from 'i18next-xhr-backend';
import { localize } from '@dw/pwa-helpers';

//DreamWorld Hammerjs
import Hammer from  "@dreamworld/hammerjs/hammer.js";

import * as app  from "./redux/app";

i18next.use(Backend).init({
  fallbackLng: 'en',
  ns: ['app'],
  defaultNS: 'app',
  backend: {
    loadPath: './src/locales/{{lng}}/{{ns}}.json'
  }
});

export class TmdbApp extends connect(store)(localize(i18next)(LitElement)){

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
    this.i18nextNameSpace = ['app'];
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
      if(e.velocity > 0 && store.getState().app.drawerOpened === false && store.getState().app.layout === 'mobile'){
        store.dispatch({
          type: 'drawerStatusChange',
          drawerOpened: true,
        });
      }

      if(e.velocity < 0 && store.getState().app.drawerOpened && store.getState().app.layout === 'mobile'){
        store.dispatch({
          type: 'drawerStatusChange',
          drawerOpened: false,
        });
      }
    });
  }

  stateChanged(state){
    this.theme = app.selectors.getCurrentTheme(state);
    this.dark = this.theme === 'dark' ? true : false;
    i18next.changeLanguage(app.selectors.getLanguage(state));
  }
}

window.customElements.define('tmdb-app', TmdbApp);