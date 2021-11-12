import { html, css } from "lit-element";
import { DwPopoverDialog } from "@dreamworld/dw-dialog/dw-popover-dialog.js";

//dw-components
import '@dreamworld/dw-list-item/dw-list-item.js';

//Redux
import { connect } from "pwa-helpers/connect-mixin";
import store from "../../redux/store";

import * as app from '../../redux/app';

class LanguageComposite extends connect(store)(DwPopoverDialog){
  constructor(){
    super();
  }

  static properties(){
    return {
      _language: {
        type: String,
      }
    }
  }

  static get styles(){
    return [
      super.styles,
      css `

      `
    ];
  }

  get _contentTemplate(){
    return html`
      <dw-list-item 
        @click=${this._onLanguageChange}
        name="en"
        title1="English" 
        ?selected=${this._isSelected('en')} 
        hasTrailingIcon
        trailingIcon=${this._isSelected('en') ? 'done' : ''}>
      </dw-list-item>
      <dw-list-item 
        @click=${this._onLanguageChange}
        name="gu"
        title1="ગુજરાતી" 
        ?selected=${this._isSelected('gu')} 
        hasTrailingIcon
        trailingIcon=${this._isSelected('gu') ? 'done' : ''}>
      </dw-list-item>
    `;
  }

  _isSelected(str){
    return this._language === str ? true : false;
  }

  _onLanguageChange(e){
    if(this._language !== e.target.getAttribute("name")){
      this._language = e.target.getAttribute("name");
      store.dispatch({
        type: 'languageChange',
        language: this._language,
      });
      this.close();
    }
  }

  stateChanged(state){
    this._language = app.selectors.getLanguage(state);
  }
}

window.customElements.define("language-composite", LanguageComposite);