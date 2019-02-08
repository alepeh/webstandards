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
          <div>name: <a href="#/Table/${resource.name}">${resource.name}</a></div>
          `
        )}`;
    }

    getResources(){
        this.apiClient.fetchResources()
            .then((response) => {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }
                response.json().then((data) => {
                    this.resources = data.resource;
                    this.render();
                    console.log(data);
                }).catch(error => console.error('Error:', error));
            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
    }
}
customElements.define('object-view', ObjectView);