import { LitElement, html, css } from "lit";


export class TestProgress extends LitElement{
  static styles = [
    css`
      :host{
        height: 48px;
        width: 48px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
      }

      .percentage{
        font-size: 12px;
      }

      .progress{
        position: absolute;
        width:100%;
        height: 100%;
      }
    `
  ]

  static properties = {
    progress: {
      type: Number,
      reflect: true
    }
  }

  render(){
    return html`
      <div class="percentage">${this.progress}%</div>
      <div class="progress">
        
      </div>
    `;
  }

  constructor(){
    super();
    this.progress = 0;
  }
}

window.customElements.define("test-progress", TestProgress);