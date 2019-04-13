import * as clientFactory from '../components/ApiClientFactory.js';
import {html, render} from 'lit-html';
import spinner from '../components/Spinner.js'
import FloatingActionButton from '../components/FloatingActionButton';


export default class TableView extends HTMLElement {

    constructor(request) {
        super();
        this.request = request;
        this.root = this.attachShadow({ mode: 'open' });
        this.schema;
        this.data;
    }

    connectedCallback(){
        render(spinner(), this.root);
        this.getResource(this.request.id);
    }

    render(){
        render(this.template(), this.root);
    }

    async getResource(name){
        await clientFactory.apiClient().then(client => {
            client.fetchResourceSchema(name)
            .then((schema) => {
                this.schema = schema;
            });
        })
        await clientFactory.apiClient().then(client => {
            client.fetchResourceData(name)
            .then((data) => {
                this.data = data;
                this.render();
            });
        })
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
            #add {
                font-size: 2em
            }
        </style>
        <floating-action-button @click=${_ => this.onAction('add',{ fields: this.mapFieldNames()})}> + </floating-action-button>
        <table>
        <tr>
        ${this.schema.field.map(
          (field) => html`
          <th>${field.name}</th>
          `
        )}
        </tr>
        ${this.data.resource.map(
            (resource) => html`
            <tr @click=${_ => this.onAction('edit',{ fields: this.mapFieldNames(), data: resource})}>
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

    mapFieldNames(){
        let fieldNames = this.schema.field.map(field => {
            return (field.name,field.name);
        })
        console.dir(this.schema.field);
        return fieldNames;
    }
}
customElements.define('table-view', TableView);