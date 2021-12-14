import { html, css } from "lit";
import { DwSurface } from "../components/dw-surface";

//Redux
import { connect } from "pwa-helpers/connect-mixin.js";
import { store } from "../../redux/store";

//i18next
import i18next from '@dw/i18next-esm';
import { localize } from '@dw/pwa-helpers';

//selectors
import * as app from "../../redux/app";
import * as router from '../../redux/router';

export class CreditsView extends connect(store)(localize(i18next)(DwSurface)){
  static styles = [
    DwSurface.styles,
    css`
      :host{
        width: min-content;
        height: 100%;
        overflow: hidden;
        cursor: pointer;
      }

      img{
        width: auto;
        height: 256px;
      }

      .details{
        padding: 16px 8px 16px;
        text-align: center;
      }

      h2{
        font-size: 0.875rem;
        margin: 0;
        width: 100%;
        overflow-wrap: break-word;
        font-weight: 700;
      }

      h3{
        font-size: 0.75rem;
        width: 100%;
        overflow-wrap: break-word;
        font-weight: 600;
      }
    `
  ];

  static properties = {
    data: { type: Object },
    imageUrl: { type: String },
    layout: {
      type: String,
      reflect: true
    }
  }

  constructor(){
    super();
    this.elevation = 2;
    this.data;
    this.imageUrl;
    this.addEventListener('click', this._handleClick);
  }

  get _getContentTemplate(){
    let imageUrl = "src/img/avatar/avatar170x256.png";
    if(this.data.profile_path !== null){
      imageUrl = "".concat(this.imageUrl, "/w500", this.data.profile_path);
    }
    
    return html`
      <img src=${imageUrl} />
      <div class="details">
        <h2>${this.data.original_name}</h2>
        <h3>as ${this.data.character}</h3>
      </div>
    `;
  }

  _handleClick(){
    router.navigatePage("person", { id: this.data.id }, false);
  }

  stateChanged(state) {
    i18next.changeLanguage(app.selectors.getLanguage(state));
    this.imageUrl = app.selectors.apiImageUrl(state);
    this.layout = app.selectors.getLayout(state);
  }
}

window.customElements.define("credits-view", CreditsView);