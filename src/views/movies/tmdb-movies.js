import { LitElement, html, css } from "lit";

//Redux
import { connect } from "pwa-helpers/connect-mixin.js";
import store from '../../redux/store';

export class TmdbMovies extends connect(store)(LitElement){

  static styles = css`

  `;

  static properties = {

  }

  constructor(){
    super();
  }

  render(){
    return html`<h1>Movies Page</h1>`;
  }
}

window.customElements.define("tmdb-movies", TmdbMovies);