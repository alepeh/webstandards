import * as clientFactory from '../components/ApiClientFactory.js';
import {html, render} from 'lit-html';

export default class ItemView extends HTMLElement {

    constructor(request) {
        super();
        this.fields = request.payload.fields;
        this.root = this.attachShadow({ mode: 'open' });
        this.data = request.payload.data;
        this.changedData = {};
        this.resource = request.id;
        this.verb = request.verb;
    }

    connectedCallback(){
        console.dir(this.data);
        render(this.template(), this.root);
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
        ${this.fields.map(
            (row) => html`
            <label for="${row}">${row}</label>
            <input id="${row}" .value=${this.data ? this.data[row] : ''} @change=${e => this.inputChanged(e,row)}></input>
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