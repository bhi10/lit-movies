import { LitElement, html, css } from "lit";

//Redux
import { connect } from "pwa-helpers/connect-mixin.js";
import { store } from "../../redux/store";

import * as app from "../../redux/app";
import * as router from "../../redux/router";
import api from "../../redux/api";

//i18next
import i18next from '@dw/i18next-esm';
import { localize } from '@dw/pwa-helpers';

//custom element
import "./list-container";
import "@dreamworld/dw-button";
import "@dreamworld/dw-input";

export class TmdbMovies extends connect(store)(localize(i18next)(LitElement)) {

  static styles = [
    css`
      :host{
        display: flex;
        flex: 1;
      }

      h2{
        margin:0;
        margin-bottom: 8px;
      }
    `
  ]

  static properties = {
    data: {
      type: Object
    },
    pageNumber: {
      type: Number
    },
    queryString: {
      type: String
    }
  }

  constructor() {
    super();
    this.data;
    this.pageNumber;
    this.timer;
    this.waitTime = 1000;
  }

  render() {
    return this._getInitView();
  }

  _getInitView() {
    if (this.data !== undefined) {
      return html`
        <div>
          <div>
            <dw-input @keyup=${this._onKeyup} value=${this.queryString} placeholder="Search"></dw-input>
          </div>
          <h2>Popular Movies</h2>
          <list-container .dataSet=${this.data.results}></list-container>
          <dw-button @click=${this._onNextClick}>Next</dw-button>
        </div>
      `
    }

    return html`<my-loader></my-loader>`;

  }

  connectedCallback() {
    super.connectedCallback();
  }

  _onKeyup(e) {

    let text = e.target.value;

    clearTimeout(this.timer);

    this.timer = setTimeout(() => {
      // this.queryString = text;
      this.searchMovies(text);
    }, this.waitTime)
  }

  searchMovies(str) {
    if (str === "") {
      router.navigatePage("movies", true);
      return;
    }
    router.navigatePage("movies", { query: str }, true);

  }

  _onNextClick(e) {
    let pageNum = this.pageNumber === undefined ? 1 : this.pageNumber;
    if (this.queryString === undefined) {
      router.navigatePage("movies", { page: pageNum + 1 }, false);
      return;
    }
    router.navigatePage("movies", { page: pageNum + 1, query: this.queryString }, false);
    this.pageNumber = pageNum + 1;
  }

  _getPopularMovies() {
    if (this.queryString !== undefined) {
      api("/search/movie", this.pageNumber)
        .then(res => this.data = res);
      return;
    }
    api("/movie/popular", this.pageNumber)
      .then(res => this.data = res);

  }

  stateChanged(state) {
    i18next.changeLanguage(app.selectors.getLanguage(state));
    this.pageNumber = router.selectors.currentPageNumber(state);
    this.queryString = router.selectors.currentQueryString(state);
    this._getPopularMovies();
  }
}

window.customElements.define("tmdb-movies", TmdbMovies);