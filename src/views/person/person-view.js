import { css, html, LitElement, nothing } from "lit";

//Redux
import { connect } from "pwa-helpers/connect-mixin.js";
import { store } from "../../redux/store";

//i18next
import i18next from "@dw/i18next-esm";
import localize from "../../component/localize";

import * as person from "../../redux/person";
import * as app from "./../../redux/app";
import * as router from "./../../redux/router";

import orderBy from "lodash-es/orderBy.js";

//Custom-components
import "../components/dw-surface";
import "../movies/list-item";
import "./../components/my-loader";
import "../components/motion-carousel.js"

export class PersonView extends connect(store)(localize(i18next)(LitElement)) {
  static styles = [
    css`
      :host {
        flex: 1;
      }

      :host([layout="mobile"]) .header {
        flex-direction: column;
      }

      :host([layout="mobile"]) .header .detail {
        padding-left: 0;
        padding-top: 16px;
      }

      .header {
        display: flex;
        flex: 1;
        background-size: cover;
        background-repeat: no-repeat;
        padding: 20px;
      }

      .header .detail {
        padding-left: 16px;
      }

      .header h2 {
        font-weight: 700;
        margin: 0;
      }

      .header img {
        width: 320px;
        height: auto;
        border-radius: 8px;
        align-self: center;
      }

      h4 {
        margin: 8px 0px;
      }

      :host([layout="mobile"]) .main {
        justify-content: center;
      }

      .main {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        width: 100%;
      }

      .main div {
        margin-right: 8px;
        margin-bottom: 8px;
      }
    `,
  ];

  static properties = {
    _id: { type: String },
    _data: { type: Object },
    layout: {
      type: String,
      reflect: true,
    },
    _credits: {
      type: Object,
    },

    _images: {
      type: Object,
    },
  };

  constructor() {
    super();
    this.imageUrl;
    this.addEventListener("click", this.handleClick);
  }

  render() {
    return this._getInitView();
  }

  firstUpdated() {
    this._getData();
  }

  _getInitView() {
    if (this._data !== undefined) {
      return html` ${this._headerview()} ${this._getBodyView()} `;
    }
    return html`<my-loader></my-loader>`;
  }

  _headerview() {
    let imageUrl = "".concat(this.imageUrl, "/w500", this._data.profile_path);

    return html`
      <div class="header">
        <img src=${imageUrl} />
        <div class="detail">
          <h2>${this._data.name}</h2>

          <div class="overview">
            <h4>Overview</h4>
            <p>${this._data.overview}</p>
          </div>
        </div>
      </div>
    `;
  }

  _getGenresView() {
    let date = new Date(this._data.release_date);
    let genresString = this._data.genres.map((e) => e.name);
    return html`<small>
      ${date.toLocaleDateString("en-US")} - ${genresString.join(", ")} -
    </small> `;
  }

  _getBodyView() {
    return html` <div class="body">${this._getCastView()}</div> `;
  }

  _getCastView() {
    if (this._credits !== undefined) {
      return html`
        <h4>Known for</h4>
        <div class="main">
          ${this._getCastList().map((row) => {
            let mImageUrl = "src/img/not-found/not-available.png";
            if (row.poster_path !== null) {
              mImageUrl = "".concat(this.imageUrl, "/w500", row.poster_path);
            }

            return html` <div>
              <list-item .id=${row.id} redirect="${row.media_type === "tv" ? "shows" : "movies"}">
                <img slot="image" src=${mImageUrl} />
                <h2 slot="title1">${row.title}</h2>
                ${row.character !== null && row.character !== ""
                  ? html`<h3 slot="title2">as ${row.character}</h3>`
                  : html``}
              </list-item>
            </div>`;
          })}
        </div>

        ${this._renderImages}
      `;
    }

    return html``;
  }

  get _renderImages() {
    if (!this._images) {
      return nothing;
    }

    return html`<h4>Images</h4>
    <div class="main">
      <motion-carousel>
        ${this._images.profiles.map((item) => {
          const imgUrl = `${this.imageUrl}/original${item.file_path}`
          return html`<img src="${imgUrl}">`
        })}
      </motion-carousel>
    </div>`
  }

  _getCastList() {
    return orderBy(this._credits.cast, [(item) => item.popularity], ["desc"]);
  }

  _getData() {
    if (this._id) {
      store.dispatch(
        person.actions.fetchDetail({ subPage: `/person/${this._id}` })
      );
      store.dispatch(
        person.actions.fetchCredit({ subPage: `/person/${this._id}/combined_credits` })
      );
      store.dispatch(
        person.actions.fetchImages({ subPage: `/person/${this._id}/images` })
      );
    }
  }

  stateChanged(state) {
    i18next.changeLanguage(app.selectors.getLanguage(state));
    this._id = router.selectors.currentId(state);
    this.imageUrl = app.selectors.apiImageUrl(state);
    this.layout = app.selectors.getLayout(state);
    this._data = person.selectors.personDetail(state, this._id);
    this._credits = person.selectors.personCredit(state, this._id);
    this._images = person.selectors.personImages(state, this._id);
  }
}

window.customElements.define("person-view", PersonView);
