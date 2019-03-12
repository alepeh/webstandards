import ApiClient from '../components/ApiClient.js';
import {html, render} from 'lit-html';

export default class TableView extends HTMLElement {

    constructor(request) {
        super();
        this.request = request;
        this.apiClient = new ApiClient();
        this.root = this.attachShadow({ mode: 'open' });
        this.schema;
        this.data;
    }

    connectedCallback(){
        console.log("table view connected");
        this.getResource(this.request.id);
    }

    render(){
        render(this.template(), this.root);
    }

    async getResource(name){
        await this.apiClient.fetchResourceSchema(name)
        .then((schema) => {
            this.schema = schema;
        });
        await this.apiClient.fetchResourceData(name)
        .then((data) => {
            this.data = data;
            this.render();
        });
    }

    template(){
        return html`
        <style>
            table {
                border-collapse: collapse;
            }

            td, th {
                border: 1px solid #818181;
                padding: 8px;
            }
        </style>
        <table>
        <tr>
        <th>ACTION</th>
        ${this.schema.field.map(
          (field) => html`
          <th>${field.name}</th>
          `
        )}
        </tr>
        ${this.data.resource.map(
            (resource) => html`
            <tr>
            <td><button @click=${_ => this.onAction('edit',{ fields: this.schema.field, data: resource})}>&#9998;</button></td>
            ${Object.values(resource).map(
                (row) => html`
                <td>${row}</td>
            `)}
            </tr>
            `
          )}
          </table>
        `;
    }

    onAction(action, payload){
        const event = new CustomEvent('vanilla-nav', {
            detail : {
                request : {
                    resource: 'Item',
                    id: this.request.id,
                    verb: action,
                    payload: payload
                }
            },
            bubbles: true
        });
        document.dispatchEvent(event);
    }
}
customElements.define('table-view', TableView);