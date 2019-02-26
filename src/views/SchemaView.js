import ApiClient from '../components/ApiClient.js';
import {html, render} from 'lit-html';

export default class ObjectView extends HTMLElement {
    
    constructor() {
        super();
        this.apiClient = new ApiClient();
        this.resources = [];
        this.root = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.getResources();
        this.render();
    }

    render(){
        render(this.template(), this.root);
    }

    template(){
        return html`
        <div>Available resources</div>
        ${this.resources.map(
          (resource) => html`
          <div><a href="#/Table/${resource.name}">${resource.name}</a></div>
          `
        )}`;
    }

    getResources(){
        this.apiClient.fetchResources()
            .then((data) => {
                this.resources = data.resource;
                this.render();
                console.dir(data);
            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
    }
}
customElements.define('object-view', ObjectView);