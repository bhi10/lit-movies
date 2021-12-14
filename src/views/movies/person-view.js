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

export class PersonView extends connect(store)(localize(i18next)(LitElement)) {

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
    this.addEventListener('click', this.handleClick);
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
    let imageUrl = "".concat(this.imageUrl, "/w500", this._data.profile_path);

    return html`
      <div class="header">
        <img src=${imageUrl}>
        <div class="detail">
          <h2>${this._data.name} </h2>

          
        
          <div class="overview">
            <h4>Overview</h4>
            <p>${this._data.overview}</p>
          </div>
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
          ${this._credits.cast.map(row => {
            
            let mImageUrl = "src/img/avatar/avatar170x256.png";
            if(row.poster_path !== null || row.poster_path !== undefined){
              mImageUrl = "".concat(this.imageUrl, "/w500", row.poster_path);
            }            

            return html`
            <div>
              <list-item .id=${row.id} redirect="movies">
              <img slot="image" src=${mImageUrl}>
                <h2 slot="title1">${row.title}</h2>
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
      api("/person/" + this._id, 1)
        .then(res => this._data = res)

      api("/person/" + this._id + "/credits", 1)
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

window.customElements.define("person-view", PersonView);