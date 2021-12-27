import { LitElement, html, css } from "lit";

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
import "./list-item";

import moment from "moment/src/moment";

export class MovieDetails extends connect(store)(localize(i18next)(LitElement)) {

  static styles = [
    css`
      :host{
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

      .header img{
        width: 320px;
        height: auto;
        border-radius: 8px;
        align-self: center;
      }

      h4{
        margin: 8px 0px;
      }

      :host([layout='mobile']) .main{
        justify-content: center;
      }

      .main{
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        width: 100%;
      }

      .main div{
        margin-right: 8px;
        margin-bottom: 8px;
      }
    `
  ];

  static properties = {
    _id: { type: String },
    _data: { type: Object },
    layout: {
      type: String,
      reflect: true
    },
    _credits: {
      type: Object
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
      

      return html`
        ${this._headerview()}
        ${this._getBodyView()}
      `;
    }
    return html`<my-loader></my-loader>`;
  }

  _headerview() {
    let imageUrl = "".concat(this.imageUrl, "/w500", this._data.poster_path);
    let backgroundImageUrl = "".concat(this.imageUrl, "/w1920_and_h800_multi_faces", this._data.backdrop_path);

    return html`
      <div class="header" style="background: linear-gradient(to right, rgb(4, 28, 50, 0.8), rgb(4, 41, 58, 0.4)), url(${backgroundImageUrl}); background-size: cover;">
        <img src=${imageUrl}>
        <div class="detail">
          <h2>${this._data.title} </h2>

          ${this._getGenresView()}
        
          <div class="overview">
            <h4>Overview</h4>
            <p>${this._data.overview}</p>
          </div>
        </div>
      </div>
    `;
  }

  _getGenresView(){

    let date = moment(this._data.release_date).format("Do MMM, YYYY");
    let genresString = this._data.genres.map( (e) => e.name);
    return html`<small>
      ${date} - 
      ${genresString.join(", ")} - 
      </small>
    `;
  }

  _getBodyView(){

    return html`
      <div class="body">
        ${this._getCastView()}
      </div>  
    `;
  }

  _getCastView(){
    if(this._credits !== undefined){
      return html`
        <h4>Cast</h4>
        <div class="main">
          ${this._credits.cast.slice(0, 20).map(row => {
            let imageUrl = "src/img/not-found/not-available.png";
            if(row.profile_path !== null){
              imageUrl = "".concat(this.imageUrl, "/w500", row.profile_path);
            }
            let releaseDate
            
            return html`
            <div>
              <list-item .id=${row.id} redirect="person">
                <img slot="image" src=${imageUrl} />
                <h2 slot="title1">${row.name}</h2>
                <h3 slot="title2">as ${row.character}</h3>
              </list-item>
            </div>`
          })}
        </div>
      `;
    }

    return html``;
  }

  _getData() {
    if (this._id !== undefined) {
      api("/movie/" + this._id, 1)
        .then(res => this._data = res)

      api("/movie/" + this._id + "/credits", 1)
        .then(res => this._credits = res)
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