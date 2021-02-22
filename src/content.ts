import {css, customElement, html, LitElement, property} from 'lit-element'
import { render } from 'lit-html'

@customElement('hanjas-frame')
class HanjasFrame extends LitElement {
  @property({type:Array})
  hanjas: string[] = []

  constructor() {
    super();
    this.loadHanjas();
    this.saveHanjas();
  }

  static styles = css`
  :host {
    display: flex;
    flex-wrap: wrap;
    margin: 10px 0;
  }
  .hanja {
    font-size: 24px;
  }
  `

  render() {
    console.log('rendered');
    return html`${this.hanjas.map(h => {
      return html`<div class="hanja">${h}</div>`
    })}`
  }

  loadHanjas () {
    this.hanjas = [...document.querySelectorAll('.myword .hanja')].map(el => el.textContent!.trim());
    if (localStorage.getItem('saved-hanjas')) {
      this.hanjas = this.hanjas.concat(JSON.parse(localStorage.getItem('saved-hanjas')!.toString()));
    }
  }

  saveHanjas () {
    localStorage.setItem('saved-hanjas', JSON.stringify(this.hanjas));
  }
}

// create container
const container = document.createElement('div')
const sibling = document.querySelector('.find_hanja')!;
// insert container
sibling.parentElement!.insertBefore(container, sibling)
// fill container with hanjas-frame element
render(html`<hanjas-frame></hanjas-frame>`, sibling)