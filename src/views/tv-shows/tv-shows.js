import { css, html, LitElement } from "lit";

//Redux
import { connect } from "pwa-helpers/connect-mixin.js";
import { store } from "../../redux/store";

import debounce from "lodash-es/debounce.js";
import api from "../../redux/api";
import * as app from "../../redux/app";
import * as shows from "../../redux/shows";
import * as router from "../../redux/router";

//i18next
import i18next from "@dw/i18next-esm";
import localize from "../../component/localize";

// Material component element
import "@material/mwc-button";
import "@material/mwc-textfield";
import "../components/my-loader";
import "./show-list-container.js";

export class TvShows extends connect(store)(localize(i18next)(LitElement)) {
  static styles = [
    css`
      :host {
        display: flex;
        flex: 1;
        margin-top: 8px;
      }

      h2 {
        margin: 0;
        margin-bottom: 8px;
      }

      .main {
        flex: 1;
      }

      .filter {
        display: flex;
        flex: 1;
        justify-content: space-between;
        align-items: center;
      }
    `,
  ];

  static properties = {
    data: {
      type: Object,
    },
    pageNumber: {
      type: Number,
    },
    queryString: {
      type: String,
    },
  };

  constructor() {
    super();
    this.data;
    this.pageNumber = 1;
    this.timer;
    this.waitTime = 1000;
  }

  render() {
    return this._getInitView();
  }

  _getInitView() {
    if (this.data !== undefined) {
      return html`
        <div class="main">
          <div class="filter">
            <mwc-textfield
              @keyup=${this._onSearch}
              value=${this.queryString}
              outlined
              placeholder="Search"
            ></mwc-textfield>
            <mwc-button
              label="Next"
              @click=${this._onNextClick}
              icon="navigate_next"
              trailingIcon
              raised
            ></mwc-button>
          </div>
          <h2>Popular Movies</h2>
          <show-list-container .dataSet=${this.data}></show-list-container>
        </div>
      `;
    }

    return html`<my-loader></my-loader>`;
  }

  firstUpdated() {
    this._fetchData(false);
  }

  connectedCallback() {
    super.connectedCallback();
    this._onScroll = debounce(this._onScroll.bind(this), 100);
    window.addEventListener("scroll", this._onScroll);
  }

  willUpdate(_changedProperties) {
    if (_changedProperties.has("pageNumber")) {
      this._fetchData(false);
    }

    if (_changedProperties.has("queryString")) {
      this.pageNumber = 1;
      this._fetchData(true);
    }
  }

  _fetchData(replace) {
    if (this.queryString) {
      store.dispatch(
        shows.actions.fetch({
          subPage: "/search/tv",
          pageNumber: this.pageNumber,
          query: this.queryString,
          replace: replace,
        })
      );
    } else {
      store.dispatch(
        shows.actions.fetch({
          subPage: "/tv/popular",
          pageNumber: this.pageNumber,
          query: this.queryString,
          replace: replace,
        })
      );
    }
  }

  _onScroll() {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 500
    ) {
      this.pageNumber = this.pageNumber + 1;
    }
  }

  _onSearch(e) {
    let text = e.target.value;

    clearTimeout(this.timer);

    this.timer = setTimeout(() => {
      // this.queryString = text;
      this.searchMovies(text);
    }, this.waitTime);
  }

  searchMovies(str) {
    if (str === "") {
      router.navigatePage("shows", false);
      return;
    }
    router.navigatePage("shows", { query: str }, false);
  }

  _onNextClick(e) {
    let pageNum = this.pageNumber === undefined ? 1 : this.pageNumber;
    if (this.queryString === undefined) {
      router.navigatePage("shows", { page: pageNum + 1 }, false);
      return;
    }
    router.navigatePage(
      "shows",
      { page: pageNum + 1, query: this.queryString },
      false
    );
    this.pageNumber = pageNum + 1;
  }

  _getPopularMovies() {
    if (this.queryString !== undefined) {
      api("/search/movie", this.pageNumber).then((res) => (this.data = res));
      return;
    }
    api("/movie/popular", this.pageNumber).then((res) => (this.data = res));
  }

  stateChanged(state) {
    i18next.changeLanguage(app.selectors.getLanguage(state));
    this.queryString = router.selectors.currentQueryString(state);
    this.data = shows.selectors.list(state);
  }
}

window.customElements.define("tv-shows", TvShows);
