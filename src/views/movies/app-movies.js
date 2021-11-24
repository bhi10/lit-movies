import { LitElement, html, css } from "lit";

//Redux
import { connect } from "pwa-helpers/connect-mixin.js";
import store from '../../redux/store';

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
    const baseUrl = "https://api.themoviedb.org/3/";
    const api_key = '6b773e1f59009e9d5efc06c47c2ccd9c';

    let url = "".concat(baseUrl, 'movie/550?api_key=', api_key);

    fetch(url)
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }
}

window.customElements.define("tmdb-movies", TmdbMovies);