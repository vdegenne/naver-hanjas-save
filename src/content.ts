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
    margin: 5px;
    cursor: pointer;
  }
  `

  render() {
    return html`${this.hanjas.map(h => {
      return html`
      <div class="hanja" @click="${(e: MouseEvent) => this.onHanjaClick(h, e)}">${h}</div>`
    })}`
  }

  onHanjaClick (hanja:string, e: MouseEvent) {
    if (!e.altKey) {
      window.open(`https://hanja.dict.naver.com/hanja?q=${encodeURIComponent(hanja)}`, '_blank')
    }
    else {
      this.hanjas.splice(this.hanjas.indexOf(hanja), 1)
      this.saveHanjas();
      this.requestUpdate()
    }
  }

  loadHanjas () {
    this.hanjas = [...document.querySelectorAll('.myword .hanja')].map(el => el.textContent!.trim());
    if (localStorage.getItem('saved-hanjas')) {
      this.hanjas = this.hanjas.concat(JSON.parse(localStorage.getItem('saved-hanjas')!.toString()));
    }
    this.hanjas = [...new Set(this.hanjas)]
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