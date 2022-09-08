import { LitElement, html, css } from "lit";

//Redux
import { connect } from "pwa-helpers/connect-mixin.js";
import { store } from "./redux/store";
import * as app from "./redux/app";
import * as router from "./redux/router";

//Views
import "./views/header/app-header";

export class AppSection extends connect(store)(LitElement) {
  static styles = css`
    :host {
      flex: 1;
      display: flex;
    }

    .backdrop {
      flex: 1 1 0%;
      background-color: rgba(0, 0, 0, 0);
      z-index: -9;
      position: fixed;
      width: 100%;
      min-height: 100vh;
      transition: background-color var(--drawer-open-time);
    }

    .backdrop[opened] {
      background-color: rgba(0, 0, 0, 0.8);
      z-index: 3;
    }

    .section {
      flex: 1;
      position: relative;
      display: flex;
      flex-direction: column;
      transition: margin-left var(--drawer-open-time);
    }

    :host([layout="desktop"]) .section {
      padding: 4px;
    }

    :host([layout="desktop"]) .section[opened] {
      margin-left: calc(var(--drawer-width) + 16px);
    }

    .body {
      display: flex;
      margin-top: 56px;
    }
  `;

  static properties = {
    layout: {
      type: String,
      reflect: true,
    },
    drawerOpened: {
      type: String,
    },
    _page: {
      type: String,
    },
    _id: {
      type: Number,
    },
  };

  constructor() {
    super();
  }

  render() {
    return this._getInitView();
  }

  _getInitView() {
    return this._getInitView();
  }

  _getInitView() {
    return html`
      ${this._getBackdropVew()}
      <div class="section" ?opened=${this.drawerOpened}>
        <app-header></app-header>
        <div class="body">${this._getPageView()}</div>
      </div>
    `;
  }

  _getBackdropVew() {
    return this.layout === "mobile"
      ? html`<div
          class="backdrop"
          @click="${this._onDrawerToggel}"
          ?opened=${this.drawerOpened}
        ></div>`
      : html``;
  }

  _getPageView() {
    if (this._page === "root" || this._page === "home") {
      import("./views//home/app-home");
      return html`<app-home></app-home>`;
    }

    if (this._page === "shows") {
      import("./views/tv-shows/tv-shows.js");
      return html`<tv-shows></tv-shows>`;
    }

    if (this._page === "movies" && this._id === undefined) {
      import("./views/movies/app-movies");
      return html`<app-movies></app-movies>`;
    }

    if (this._page === "movies" && this._id !== undefined) {
      import("./views/movies/movie-details");
      return html`<movie-details></movie-details>`;
    }

    if (this._page === "person" && this._id === undefined) {
      import("./views/person/app-person");
      return html`<app-person></app-person>`;
    }

    if (this._page === "person" && this._id !== undefined) {
      import("./views/person/person-view");
      return html`<person-view></person-view>`;
    }

    if (this._page === "test") {
      import("./views/test/test-page");
      return html`<test-page></test-page>`;
    }

    if (this._page === "not-found") {
      import("./views/not-found");
      return html`<not-found></not-found>`;
    }

    import("./views/not-found");
    return html`<not-found></not-found>`;
  }

  _onDrawerToggel() {
    store.dispatch({
      type: "drawerStatusChange",
      drawerOpened: this.drawerOpened ? false : true,
    });
  }

  stateChanged(state) {
    this.layout = app.selectors.getLayout(state);
    this.drawerOpened = app.selectors.getDrawerStatus(state);
    this._page = router.selectors.currentPage(state);
    this._id = router.selectors.currentId(state);
    console.log(state);
  }
}

window.customElements.define("app-section", AppSection);
