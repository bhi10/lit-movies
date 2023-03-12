import { css, html, LitElement } from "lit";

//Redux
import { connect } from "pwa-helpers/connect-mixin.js";
import { store } from "../../redux/store";

import api from "../../redux/api";
import * as app from "../../redux/app";
import * as person from "../../redux/person";
import * as router from "../../redux/router";

import debounce from "lodash-es/debounce.js";
//i18next
import i18next from "@dw/i18next-esm";
import localize from "../../component/localize";

//components
import "@material/mwc-button";
import "@material/mwc-textfield";
import "../components/my-loader";
import "../movies/list-item";

export class AppPerson extends connect(store)(localize(i18next)(LitElement)) {
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

      .body {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        width: 100%;
      }

      .body div {
        margin-right: 8px;
        margin-bottom: 8px;
      }
    `,
  ];

  static properties = {
    _data: {
      type: Object,
    },
    _pageNumber: {
      type: Number,
    },
    _queryString: {
      type: String,
    },
  };

  constructor() {
    super();
    this._data;
    this._pageNumber = 1;
    this.timer;
    this.waitTime = 1000;
  }

  render() {
    return this._getInitView();
  }

  _getInitView() {
    if (this._data !== undefined) {
      return html`
        <div class="main">
          <div class="filter">
            <mwc-textfield
              @keyup=${this._onSearch}
              value=${this._queryString}
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
          <h2>Popular Persons</h2>
          ${this._getPersonsView()}
        </div>
      `;
    }
    return html`<my-loader></my-loader>`;
  }

  _getPersonsView() {
    return html`
      <div class="body">
        ${this._data.map((row) => {
          let imageUrl = "src/img/not-found/not-available.png";
          if (row.profile_path !== null) {
            imageUrl = "".concat(this.imageUrl, "/w500", row.profile_path);
          }
          return html`
            <div>
              <list-item .id=${row.id} redirect="person">
                <img slot="image" src=${imageUrl} />
                <h2 slot="title1">${row.name}</h2>
              </list-item>
            </div>
          `;
        })}
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this._onScroll = debounce(this._onScroll.bind(this), 100);
    window.addEventListener("scroll", this._onScroll);
  }

  firstUpdated() {
    this._fetchData(false);
  }

  willUpdate(_changedProperties) {
    if (_changedProperties.has("_pageNumber")) {
      this._fetchData(false);
    }

    if (_changedProperties.has("_queryString")) {
      this._pageNumber = 1;
      this._fetchData(true);
    }
  }

  _onScroll() {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 500
    ) {
      this._pageNumber = this._pageNumber + 1;
    }
  }

  _fetchData(replace) {
    if (this._queryString) {
      store.dispatch(
        person.actions.fetch({
          subPage: "/search/person",
          pageNumber: this._pageNumber,
          query: this._queryString,
          replace: replace,
        })
      );
    } else {
      store.dispatch(
        person.actions.fetch({
          subPage: "/person/popular",
          pageNumber: this._pageNumber,
          query: this._queryString,
          replace: replace,
        })
      );
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
      router.navigatePage("person", false);
      return;
    }
    router.navigatePage("person", { query: str }, false);
  }

  _onNextClick() {
    let pageNum = this._pageNumber === undefined ? 1 : this._pageNumber;
    if (this._queryString === undefined) {
      router.navigatePage("person", { page: pageNum + 1 }, false);
      return;
    }
    router.navigatePage(
      "person",
      { page: pageNum + 1, query: this._queryString },
      false
    );
    this._pageNumber = pageNum + 1;
  }

  _getPopularPerson() {
    if (this._queryString !== undefined) {
      api("/search/person", this._pageNumber).then(
        (res) => (this._data = res.results)
      );
      return;
    }
    api("/person/popular", this._pageNumber).then(
      (res) => (this._data = res.results)
    );
  }

  stateChanged(state) {
    i18next.changeLanguage(app.selectors.getLanguage(state));
    this._queryString = router.selectors.currentQueryString(state);
    this.imageUrl = app.selectors.apiImageUrl(state);
    this._data = person.selectors.list(state);
  }
}

window.customElements.define("app-person", AppPerson);
