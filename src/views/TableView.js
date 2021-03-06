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
        this.order = { field: '', direction: ''};
    }

    connectedCallback(){
        console.log("Resource:" + this.request.resource);
        render(spinner(), this.root);
        this.getResource(this.request.resource);
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
            client.fetchResourceData(name, this.order)
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
            .ASC:after{
                content: " ↑";
            }
            .DESC:after{
                content: " ↓";
            }
        </style>
        <floating-action-button @click=${_ => this.onAction('add')}> + </floating-action-button>
        <table>
        <tr>
        ${this.schema.field.map(
          (field) => html`
          <th id=${field.name} @click=${_ => this.setOrder(field.name)}>${field.name}</th>
          `
        )}
        </tr>
        ${this.data.resource.map(
            (resource) => html`
            <tr @click=${_ => this.onAction('edit',resource.ID)}>
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

    onAction(action, id){
        window.location.hash = "/Form/" + this.request.resource + "/" + (id ? id + '/' : '/') + action;
    }

    mapFieldNames(){
        let fieldNames = this.schema.field.map(field => {
            return (field.name,field.name);
        })
        console.dir(this.schema.field);
        return fieldNames;
    }

    setOrder(field){
        let oldField = this.order.field;
        let oldDirection = this.order.direction;
        if(oldField){
            this.root.getElementById(oldField).classList.remove(oldDirection);
        }
        let newDirection = this.order.direction === 'DESC' ? 'ASC' : 'DESC'; 
        this.root.getElementById(field).classList.add(newDirection);
        this.order.field = field;
        this.order.direction = newDirection;
        this.getResource(this.request.resource);
    }
}
customElements.define('table-view', TableView);