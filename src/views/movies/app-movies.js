import { LitElement, html, css } from "lit";

//Redux
import { connect } from "pwa-helpers/connect-mixin.js";
import store from '../../redux/store';

//Utilities
import * as utils from "../../utils";

export class TmdbMovies extends connect(store)(LitElement) {

  static styles = css`

  `;

  static properties = {

  }

  constructor() {
    super();
    this._getData();
  }

  render() {
    return html`<h1>Movies Page</h1>`;
  }

  _getData() {
    let url = utils.getApiUrl("/movie/popular", 2);

    fetch(url)
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }
}

window.customElements.define("tmdb-movies", TmdbMovies);