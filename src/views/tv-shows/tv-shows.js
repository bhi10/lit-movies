import { LitElement, html, css } from "lit";

//Redux
import { connect } from "pwa-helpers/connect-mixin.js";
import store from '../../redux/store';

export class TvShows extends connect(store)(LitElement){

  static styles = css`

  `;

  static properties = {

  }

  constructor(){
    super();
  }

  render(){
    return html`<h1>Tv Shows Page</h1>`;
  }
}

window.customElements.define("tv-shows", TvShows);