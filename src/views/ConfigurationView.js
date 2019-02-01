export default class ConfigurationView extends HTMLElement {

    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const savedApiKey = localStorage.getItem("apikey");
        const savedApiUrl = localStorage.getItem("apiurl");
        const savedServicename = localStorage.getItem("servicename");

        this.root.innerHTML = `
            <h3>Configuration</h3>
            <input type="text" id="apikey" placeholder="apikey" value="${savedApiKey}"/><br/>
            <input type="text" id="apiurl" placeholder="apiurl"value="${savedApiUrl}"/><br/>
            <input type="text" id="servicename" placeholder="servicename" value="${savedServicename}"/><br/>
            <button>Save</button>
            `;
        this.apikeyInput = this.root.querySelector('#apikey');
        this.apiurlInput = this.root.querySelector('#apiurl');
        this.serviceNameInput = this.root.querySelector('#servicename');
        this.root.querySelector('button').onclick = _ => this.save();
    }

    save() {
        localStorage.setItem("apikey", this.apikeyInput.value);
        localStorage.setItem("apiurl", this.apiurlInput.value);
        localStorage.setItem("servicename", this.serviceNameInput.value);
    }
}
customElements.define('configuration-view', ConfigurationView);