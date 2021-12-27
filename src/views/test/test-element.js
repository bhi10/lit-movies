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

import moment from "moment/src/moment";

//components
import "@dreamworld/dw-icon-button";
import "./test-progress";

export class TestElement extends connect(store)(localize(i18next)(DwSurface)){
  static styles = [
    DwSurface.styles,
    css`
      :host{
        width: min-content;
        overflow: hidden;
        cursor: pointer;
        margin-right: 20px;
        margin-bottom: 20px;
        transition: all 0.5s ease-in-out;
        overflow: hidden;
        border-radius: 16px;
        background-color: #29333D;
        color: white;
      }

      :host([selected]){
        transform: scale(1.12);
        box-shadow: var(--mdc-elevation--z8);
        color: #04BCD4;
        z-index: 999;
      }

      :host([selected]) dw-icon-button{
        --dw-icon-color: #04BCD4;
      }

      .image{
        overflow: hidden;
        position: relative;
      }

      .image::after{
        width: 100%;
        height: 100%;
        position: absolute;
        content: "";
        left:0;
        bottom:4px;
        background-image: linear-gradient(to bottom, rgba(256,256,256, 0) 85%, rgb(53,63,71,0.8) 100%);
      }

      .image img {
        width: auto;
        height: 200px;
      }

      .details{
        padding: 4px 12px;
        display: flex;
      }

      .icon{
        width: min-content; 
        justify-content: center;
        align-items: center;
        display: flex;
      }

      .title{
        margin-left: 12px;
      }

      .title h2{
        margin: 0px;
        font-size: 20px;
        font-weight: 500;
      }

      .title h5{
        margin: 0;
        font-size: 12px;
        font-weight: 500;
      }

      dw-icon-button{
        border: solid 1px;
        border-radius: 50%;

        --dw-icon-color: white;
        --dw-icon-color-active: #04BCD4;
      }
    `
  ]

  static properties = {
    _title: {
      type: String
    },
    _length: {
      type: Number
    },
    _thumbUrl: {
      type: String
    },
    _language: {
      type: String
    },
    _recordingDate: {
      type: String
    },
    _status: {
      type: String
    },
    _size: {
      type: Number
    },
    _downloadedSize: {
      type: Number
    },
    selected: {
      type: Boolean,
      reflect: true
    }
  }

  constructor(){
    super();
    this.elevation = 2;
    this.selected = false;
    this.addEventListener('click', this._onClick);

    this._title = "Geeta A-12, SL-2, P-2";
    this._length = 45;
    this._language = "Gujrati";
    this._recordingDate = "1986-01-01";
    this._status = "SCHEDULED";
    this._size = 700000;
    this._thumbUrl = "https://image.tmdb.org/t/p/w500/eD1C60oJXvA5uYVBx3k6lq2RMve.jpg";
    this._downloadedSize = 0;
  }

  get _getContentTemplate(){
    let percentage = Math.round(100*this._downloadedSize/this._size);
    
    return html`
      <div class="image">
        <img src=${this._thumbUrl}>
      </div>
      <div class="details">
        <div class="icon">
          <test-progress @click=${this._onIconClick} progress=${percentage} ?selected=${this.selected} status=${this._status}></test-progress>
        </div>
        <div class="title">
          <h2>${this._title}</h2>
          <h5>${this._length} min - ${this._language} - ${moment(this._recordingDate).format("YYYY")}</h5>
          <h5>${this._statusView()}</h5>
        </div>
      </div>
    `
  }

  _statusView(){

    if(this._status === "SCHEDULED"){
      return html`Download Queued ${this._size/1000} MB`
    }

    if(this._status === "DOWNLOADING"){
      return html`Downloading... ${this._downloadedSize/1000}/${this._size/1000} MB`
    }

    if(this._status === "READY"){
      return html`Ready ${this._size/1000} MB`
    }
  }

  _timeout(){
    if(this._downloadedSize < this._size){
      setTimeout(() => {
        this._downloadedSize = this._downloadedSize + 14000;
        
        this._timeout();
      }, 500)
      return;
    }
    this._status = "READY";
  }

  _onClick(e){
    if(this.selected){
      this.selected = false;
      return;
    }
    this.selected = true;
    
  }

  _onIconClick(e){
    if(this._status === "SCHEDULED"){
      this._status = "DOWNLOADING";
      this._timeout();
      
    }
  }

  stateChanged(state){

  }
}

window.customElements.define("test-element", TestElement);