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

export class ListContainer extends connect(store)(localize(i18next)(LitElement)){
  static styles = [
    css`
      :host{
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        
      }
    `
  ]

  static properties = {
    dataSet: {type: Object}
  }

  constructor(){
    super();
    this.dataSet
  }

  render(){
    console.log(this.dataSet);
    return html`
      ${this.dataSet.map( row => html`<list-item .data=${row}></list-item>`)}
    `;
  }

  stateChanged(state){
    i18next.changeLanguage(app.selectors.getLanguage(state));
  }
}

window.customElements.define("list-container", ListContainer);