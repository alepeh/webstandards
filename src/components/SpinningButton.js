import {html, render} from 'lit-html';

export default class SpinningButton extends HTMLElement {

    constructor(){
        super();
        this.root = this.attachShadow({ mode: 'open' });
        this.loading = false;
    }

    static get observedAttributes() {
        return ['disabled'];
    }

    connectedCallback(){
        this._upgradeProperty('disabled');
        this.stop();
    }

    _upgradeProperty(prop) {
        if (this.hasOwnProperty(prop)) {
          let value = this[prop];
          delete this[prop];
          this[prop] = value;
        }
    }

    set disabled(value) {
        const isDisabled = Boolean(value);
        if (isDisabled)
          this.setAttribute('disabled', '');
        else
          this.removeAttribute('disabled');
      }
  
    get disabled() {
        return this.hasAttribute('disabled');
      }

    start(){
        this.loading = true;
        render(this.template('Loading...'),this.root);
    }

    stop(){
        this.loading = false;
        render(this.template('Save'),this.root);
    }

    toggle(){
        this.loading ? this.stop() : this.start();
    }

    template(buttonText){
        return html`
            <button ${this.disabled ? html`disabled` : html``} >${buttonText}</button>
        `;
    }
}
customElements.define('spinning-button', SpinningButton);