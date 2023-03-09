import { html, css } from "lit";

//Redux
import { connect } from "pwa-helpers/connect-mixin.js";
import { store } from "../../redux/store";

//i18next
import i18next from "@dw/i18next-esm";
import localize from "../../component/localize";

// Material Components
import "@material/mwc-icon-button";

//Custom Components
import { DwSurface } from "../components/dw-surface";
import "./profile-popover.js";

//Selectors
import * as app from "../../redux/app";
import * as router from "../../redux/router";

export class AppHeader extends connect(store)(localize(i18next)(DwSurface)) {
  static styles = [
    ...DwSurface.styles,
    css`
      :host {
        display: block;
        position: fixed;
        height: 56px;
        z-index: 5;
        left: 8px;
        right: 8px;
        top: 8px;
        transition: left var(--drawer-open-time);
      }

      :host([_drawerOpened]) {
        left: calc(var(--drawer-width) + 16px);
      }

      :host([layout="mobile"]) {
        border-radius: 0px;
        left: 0;
        right: 0;
        top: 0;
        z-index: 1;
      }

      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        overflow: hidden;
      }

      .header div {
        display: flex;
        align-items: center;
      }

      mwc-icon-button {
        width: max-content;
        height: max-content;
      }

      .title {
        flex: 1;
      }

      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        cursor: pointer;
        object-fit: cover;
      }
    `,
  ];

  static properties = {
    page: {
      type: String,
    },
    layout: {
      type: String,
      reflect: true,
    },
    _drawerOpened: {
      type: Boolean,
      reflect: true,
    },
  };

  get _getContentTemplate() {
    return html`
      <div class="header">
        <div class="title">
          <mwc-icon-button
            id="btn-menu"
            @click="${this._onDrawerToggel}"
            icon="menu"
          ></mwc-icon-button>
          <h4>${this._getPageName()}</h4>
        </div>
        ${this._getProfileView()}
      </div>

      <profile-popover id="profile-popover"></profile-popover>
    `;
  }

  _getProfileView() {
    return html`<img
      @click="${this._onProfileClick}"
      src="src/img/not-found/page-not-found.png"
    />`;
  }

  _getPageName() {
    return i18next.t(this.page.toLowerCase());
  }

  _onProfileClick(e) {
    let popover = this.renderRoot.querySelector("#profile-popover");
    popover.showTrigger = true;
    popover.open(e.target);
  }

  _onDrawerToggel(e) {
    store.dispatch({
      type: "drawerStatusChange",
      drawerOpened: store.getState().app.drawerOpened ? false : true,
    });
  }

  stateChanged(state) {
    this.page = router.selectors.currentModule(state);
    this.layout = app.selectors.getLayout(state);
    this.elevation = app.selectors.getScrollTop(state) ? 0 : 2;
    this._drawerOpened = app.selectors.getDrawerStatus(state);
  }
}

window.customElements.define("app-header", AppHeader);
