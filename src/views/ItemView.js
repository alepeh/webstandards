import apiClient from '../components/ApiClientFactory.js';
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
        render(this.template(), this.root);
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
        ${this.fields.map(
            (row) => html`
            <tr>
            <td>${row}</td>
            <td><input .value=${this.data ? this.data[row] : ''} @change=${e => this.inputChanged(e,row)}></input></td>
            </tr>
          `
        )}
        </table>
        <button @click=${_ => this.save()}>Save</button>
        `;
    }

    save(){
        if(this.verb === 'edit'){
            console.log('edit');
            apiClient().then(client => {
                client.partialUpdate(this.resource, this.data['ID'], this.changedData);
            });
        }
        else if(this.verb === 'add'){
            console.log('add');
            let newRecord = {"resource" : [
                this.changedData
            ]};
            apiClient().then(client => {
                client.add(this.resource, newRecord);
            });
        }
    }

    inputChanged(e,field){
        this.changedData[field] = e.target.value;
    }
}
customElements.define('item-view', ItemView);