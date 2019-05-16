import * as clientFactory from '../components/ApiClientFactory.js';
import {html, render} from 'lit-html';

export default class ItemView extends HTMLElement {

    constructor(request) {
        super();
        this.request = request;
        this.root = this.attachShadow({ mode: 'open' });
        this.data;
        this.changedData = {};
        this.id = request.id;
        this.resource = request.resource;
        this.verb = request.verb;
        this.schema;
    }

    connectedCallback(){
        this.fetchDataFromBackend(this.resource, this.id);
    }

    async fetchDataFromBackend(name, id){
        await clientFactory.apiClient().then(client => {
            client.fetchResourceSchema(name)
            .then((schema) => {
                this.schema = schema;
                render(this.template(), this.root);
            })
            .then(_ => {
                if(id){
                    clientFactory.apiClient().then(client => {
                        client.fetchResourceDataById(name, id)
                        .then((data) => {
                        this.data = data;
                        console.dir(data);
                        render(this.template(), this.root);
                        });
                    })
                }
            })
        })
    }

    template(){
        return html`
        <style>
            input {
                width: 100%;
                padding: 12px 20px;
                margin: 8px 0;
                display: inline-block;
                border: 1px solid #ccc;
                border-radius: 4px;
                box-sizing: border-box;
                font-size: 1em;
            }
            label {
                color: #818181;
            }
        </style>
        <table>
        ${this.schema.field.map(
            (row) => html`
            <label for="${row.name}">${row.name}</label>
            <input id="${row.name}" .value=${this.data ? this.data[row.name] : ''} @change=${e => this.inputChanged(e,row.name)}></input>
          `
        )}
        </table>
        <button @click=${_ => this.save()}>Save</button>
        `;
    }

    save(){
        if(this.verb === 'edit'){
            console.log('edit');
            clientFactory.apiClient().then(client => {
                client.partialUpdate(this.resource, this.data['ID'], this.changedData);
            });
        }
        else if(this.verb === 'add'){
            console.log('add');
            let newRecord = {"resource" : [
                this.changedData
            ]};
            clientFactory.apiClient().then(client => {
                client.add(this.resource, newRecord);
            });
        }
    }

    inputChanged(e,field){
        this.changedData[field] = e.target.value;
    }
}
customElements.define('item-view', ItemView);