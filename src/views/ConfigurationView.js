export default class ConfigurationView extends HTMLElement {

    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.root.innerHTML = `
            <h3>Configuration</h3>
            <input type="text" id="apikey"/><br/>
            <input type="text" id="apiurl"/><br/>
            <button>Save</button>
            `;
        this.apikeyInput = this.root.querySelector('#apikey');
        this.apiurlInput = this.root.querySelector('#apiurl');
        this.root.querySelector('button').onclick = _ => this.save();
    }

    save() {
        localStorage.setItem("apikey", this.apikeyInput.value);
        localStorage.setItem("apiurl", this.apiurlInput.value);
    }
}
customElements.define('configuration-view', ConfigurationView);