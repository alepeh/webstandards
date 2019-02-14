import ApiClient from '../components/ApiClient.js';
import {html, render} from 'lit-html';

export default class TableView extends HTMLElement {

    constructor(request) {
        super();
        this.request = request;
        this.apiClient = new ApiClient();
        this.root = this.attachShadow({ mode: 'open' });
    }

    connectedCallback(){
        this.getResource(this.request.id);
    }

    render(data){
        render(this.template(data), this.root);
    }

    getResource(name){
        this.apiClient.fetchResource(name)
        .then((data) => {
            console.log(data)
           this.render(data);
        })
    }

    template(data){
        return html`
        <div>Schema</div>
        <table border="1">
        <th>
        ${data.field.map(
          (resource) => html`
          <td>${resource.name}</td>
          `
        )}
        </th>`;
    }
}
customElements.define('table-view', TableView);