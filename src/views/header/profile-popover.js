import { html, css } from 'lit-element';
import { DwCompositeDialog } from '@dreamworld/dw-dialog/dw-composite-dialog.js';

//Redux
import { connect } from "pwa-helpers/connect-mixin";
import store from '../../redux/store.js';

import * as app from '../../redux/app';

//i18next
import i18next from '@dw/i18next-esm';
import { localize } from '@dw/pwa-helpers';

//Dw-Components
import '@dreamworld/dw-list-item/dw-list-item';

//custom-components
import './theme-composite.js';
import './language-composite.js';

class ProfilePopover extends connect(store)(localize(i18next)(DwCompositeDialog)){
  constructor(){
    super();
    this.triggerElement;
    this.type = 'popover';
    this.i18nextNameSpace = ['app'];
  }

  static get properties(){
    return{
      _language: {
        type: String,
      }
    }
  }

  static get styles(){
    return[
      super.styles,
      css`
        :host{
          border-radius: 8px;
        }

        #dialog-header{
          display: flex;
          justify-content: center;
        }

        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          cursor: pointer;
          object-fit: cover;
        } 
      `
    ];
  }

  get _headerTemplate(){
    return html`
      <img src="src/img/page-not-found.png">
    `;
  }

  get _contentTemplate(){
    return html`
      <dw-list-item id="theme" @click=${this._openThemePopover} title1="${i18next.t('theme')}" leadingIcon="brightness_7" trailingIcon="navigate_next" selectionMode="none"></dw-list-item>
      <dw-list-item id="Language" @click=${this._openLanguagePopover} title1="${i18next.t('language')}" leadingIcon="language" trailingIcon="navigate_next" selectionMode="none"></dw-list-item>

      <theme-composite showTrigger></theme-composite>
      <language-composite showTrigger></language-composite>
    `;
  }

  _openThemePopover(e){
    let dialog = this.renderRoot.querySelector('theme-composite');
    dialog.showTrigger = true;
    dialog.popoverPlacement = 'left-start';
    dialog.open(e.target);
  }

  _openLanguagePopover(e){
    let dialog = this.renderRoot.querySelector('language-composite');
    dialog.showTrigger = true;
    dialog.popoverPlacement = 'left-start';
    dialog.open(e.target);
  }

  stateChanged(state){
    this._language = app.selectors.getLanguage(state);
  }
}

window.customElements.define("profile-popover", ProfilePopover);