import { LitElement, html, css } from "lit";

//Redux
import { connect } from "pwa-helpers/connect-mixin";
import { store } from "../../redux/store";

import * as app from "../../redux/app";
import * as router from "../../redux/router";

//Dw Components
import "@dreamworld/dw-list-item/dw-list-item";

//i18next
import i18next from "@dw/i18next-esm";
import localize from "../../component/localize";

//Custom Components
import { DwSurface } from "../components/dw-surface";

export class AppDrawer extends connect(store)(localize(i18next)(DwSurface)) {
  static styles = [
    DwSurface.styles,
    css`
      :host {
        position: fixed;
        z-index: 4;
        overflow-y: auto;
        overflow-x: hidden;
        padding: 4px;
        width: var(--drawer-width);
        left: calc(var(--drawer-width) * -1.05);
        height: calc(100vh - 16px);
        margin: 8px;
        transition: left var(--drawer-open-time);
      }

      :host([opened]) {
        left: 0;
      }

      :host([layout="mobile"]) {
        padding: 0;
        margin: 0;
        height: 100vh;
        border-radius: 0;
      }

      .header {
        display: flex;
        justify-content: end;
        align-items: center;
      }
    `,
  ];

  static properties = {
    opened: {
      type: Boolean,
      reflect: true,
      attribute: "opened",
    },
    _page: {
      type: String,
    },
    _module: {
      type: String,
    },
    layout: {
      type: String,
      reflect: true,
    },
  };

  constructor() {
    super();
    this.opened = true;
    this._page;
    this.i18nextNameSpace = ["app"];
  }

  get _getContentTemplate() {
    return html`
      <div class="body">
        <dw-list-item
          lable="home"
          leadingIcon="home"
          hasLeadingIcon
          title1="${i18next.t("home")}"
          @click="${this._onPageChange}"
          ?selected=${this._isSelected("Home")}
        ></dw-list-item>
        <dw-list-item
          lable="movies"
          leadingIcon="movie"
          hasLeadingIcon
          title1="${i18next.t("movies")}"
          @click="${this._onPageChange}"
          ?selected=${this._isSelected("Movies")}
        ></dw-list-item>
        <dw-list-item
          lable="shows"
          leadingIcon="live_tv"
          hasLeadingIcon
          title1="${i18next.t("shows")}"
          @click="${this._onPageChange}"
          ?selected=${this._isSelected("Shows")}
        ></dw-list-item>
        <dw-list-item
          lable="person"
          leadingIcon="person"
          hasLeadingIcon
          title1="${i18next.t("person")}"
          @click="${this._onPageChange}"
          ?selected=${this._isSelected("Person")}
        ></dw-list-item>
      </div>
    `;
  }

  _onPageChange(e) {
    if (this._page !== e.target.getAttribute("lable")) {
      router.navigatePage(e.target.getAttribute("lable"), true);

      if (this.layout === "mobile") {
        this._onDrawerClose();
      }
    }
  }

  _isSelected(str) {
    if (this._module === str) {
      return true;
    }
    return false;
  }

  _onDrawerClose() {
    store.dispatch({
      type: "drawerStatusChange",
      drawerOpened: false,
    });
  }

  stateChanged(state) {
    this.opened = app.selectors.getDrawerStatus(state);
    this.layout = app.selectors.getLayout(state);
    this._page = router.selectors.currentPage(state);
    this._module = router.selectors.currentModule(state);
    i18next.changeLanguage(app.selectors.getLanguage(state));
  }
}

window.customElements.define("app-drawer", AppDrawer);
