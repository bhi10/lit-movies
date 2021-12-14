import { LitElement, html, css } from "lit";

//Redux
import { connect } from "pwa-helpers/connect-mixin.js";
import { store } from "../../redux/store";

//i18next
import i18next from '@dw/i18next-esm';
import { localize } from '@dw/pwa-helpers';

//custom-components
import "./list-item";

//selectors
import * as app from "../../redux/app";

export class ListContainer extends connect(store)(localize(i18next)(LitElement)) {
  static styles = [
    css`
      :host{
        flex: 1;
        display: flex; 
        width: 100%;
        flex-wrap: wrap;
        align-items: flex-start;
        align-content: flex-start;
        top: 0;
        left: 0;
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
  ]

  static properties = {
    dataSet: { type: Object },
    layout: {
      type: String,
      reflect: true
    },
    imageUrl: { 
      type: String 
    }
  }

  constructor() {
    super();
    this.dataSet;

  }

  render() {
    return html`
      <div class="main">
        ${this.dataSet.map(row => {
          let imageUrl = "".concat(this.imageUrl, "/w500", row.poster_path);
          return html`
            <div>
              <list-item .id=${row.id} redirect="movies">

                <img slot="image" src=${imageUrl} />
                <h2 slot="title1">${row.title}</h2>
                  
              </list-item>
            </div>`
        } )}
      </div>
    `;
  }

  stateChanged(state) {
    i18next.changeLanguage(app.selectors.getLanguage(state));
    this.layout = app.selectors.getLayout(state);
    this.imageUrl = app.selectors.apiImageUrl(state);
  }
}

window.customElements.define("list-container", ListContainer);