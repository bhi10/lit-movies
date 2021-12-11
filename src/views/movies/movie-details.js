import { LitElement, html, css } from "lit";

import { unsafeCSS } from "@lit/reactive-element";

//Redux
import { connect } from "pwa-helpers/connect-mixin.js";
import { store } from "../../redux/store";

//i18next
import i18next from '@dw/i18next-esm';
import { localize } from '@dw/pwa-helpers';

import * as router from './../../redux/router';
import * as app from './../../redux/app';

import api from "../../redux/api";

//Custom-components
import "./../components/my-loader";
import "../components/dw-surface";

export class MovieDetails extends connect(store)(localize(i18next)(LitElement)) {

  static styles = [
    css`
      :host{
        display: flex;
        flex: 1;
      }

      :host([layout="mobile"]) .header{
        flex-direction: column;
      }

      :host([layout="mobile"]) .header .detail{
        padding-left: 0;
        padding-top: 16px;
      }

      .header{
        display: flex;
        flex: 1;
        background-size: cover;
        background-repeat: no-repeat;
        color: white;
        padding: 20px;
      }

      .header .detail{
        padding-left: 16px;
      }

      .header h2{
        font-weight: 700;
        margin: 0;
      }

      img{
        width: 320px;
        height: auto;
        border-radius: 8px;
      }
    `
  ];

  static properties = {
    _id: { type: String },
    _data: { type: Object },
    layout: {
      type: String,
      reflect: true
    }
  }

  constructor() {
    super();
    this.imageUrl;
  }

  render() {
    return this._getInitView();
  }

  firstUpdated() {
    this._getData();
  }

  _getInitView() {

    if (this._data !== undefined) {
      let backgroundImageUrl = "".concat(this.imageUrl, "/w1920_and_h800_multi_faces", this._data.backdrop_path);

      return html`
        <div class="header" style="background: linear-gradient(to right, rgb(4, 28, 50, 0.8), rgb(4, 41, 58, 0.4)), url(${backgroundImageUrl}); background-size: cover;">
          ${this._headerview()}
        </div>
      `;
    }
    return html`<my-loader></my-loader>`;
  }

  _headerview() {
    let imageUrl = "".concat(this.imageUrl, "/w500", this._data.poster_path);
    let date = new Date(this._data.release_date);

    return html`
      <img src=${imageUrl}>
      <div class="detail">
        <h2>${this._data.title} </h2>

        ${this._getGenresView()}
      
        <div class="overview">
          <h4>Overview</h4>
          <p>${this._data.overview}</p>
        </div>
      </div>
    `;
  }

  _getGenresView(){

    let date = new Date(this._data.release_date);
    let genresString = this._data.genres.map( (e) => e.name);
    return html`<small>
      ${date.toLocaleDateString("en-US")} - 
      ${genresString.join(", ")} - 
      </small>
    `;
  }

  _getData() {
    if (this._id !== undefined) {
      api("/movie/" + this._id, 1)
        .then(res => this._data = res)
        .then(res => console.log(res))
    }

  }

  stateChanged(state) {
    i18next.changeLanguage(app.selectors.getLanguage(state));
    this._id = router.selectors.currentId(state);
    this.imageUrl = app.selectors.apiImageUrl(state);
    this.layout = app.selectors.getLayout(state);
  }
}

window.customElements.define("movie-details", MovieDetails);