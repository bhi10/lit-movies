import { html, css } from "lit-element";
import { DwPopoverDialog } from "@dreamworld/dw-dialog/dw-popover-dialog.js";

//dw-components
import '@dreamworld/dw-list-item/dw-list-item.js';

//Redux
import { connect } from "pwa-helpers/connect-mixin";
import {store} from "../../redux/store";

import * as app from '../../redux/app';

class ThemeComposite extends connect(store)(DwPopoverDialog) {
  constructor() {
    super();
  }

  static properties() {
    return {
      theme: {
        type: String,
        reflect: true,
      }
    }
  }

  static get styles() {
    return [
      super.styles,
      css`

      `
    ];
  }

  get _contentTemplate() {
    return html`
      <dw-list-item @click=${this._onThemeChange} title1="Light" leadingIcon="light_mode"
        ?selected=${this._isSelected('light')} hasTrailingIcon trailingIcon=${this._isSelected('light') ? 'done' : '' }>
      </dw-list-item>
      <dw-list-item @click=${this._onThemeChange} title1="Dark" leadingIcon="nightlight" ?selected=${this._isSelected('dark')}
        hasTrailingIcon trailingIcon=${this._isSelected('dark') ? 'done' : '' }>
      </dw-list-item>
    `;
  }

  _isSelected(str) {
    return this._theme === str ? true : false;
  }

  _onThemeChange(e) {
    if (this._theme !== e.target.title1.toLowerCase()) {
      this._theme = this._theme === 'light' ? 'dark' : 'light';
      console.log(this._theme);
      store.dispatch(app.actions.changeTheme(this._theme));
      this.close();
    }
  }

  stateChanged(state) {
    this._theme = app.selectors.getCurrentTheme(state);
  }
}

window.customElements.define("theme-composite", ThemeComposite);