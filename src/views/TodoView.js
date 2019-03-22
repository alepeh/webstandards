import apiClient from '../components/ApiClientFactory.js';
import {html, render} from 'lit-html';

export default class TodoView extends HTMLElement {
    constructor(){
        super();
        this.apiClient =  apiClient();
        this.root = this.attachShadow({ mode: 'open' });
        this.data;
    }

    connectedCallback(){
        this.getResource();
    }

    getResource(){
        apiClient().then(client => {
            client.fetchResourceData('TODO?order=COMPLETED_TSTAMP,CREATED_TSTAMP')
            .then((data) => {
                this.data = data;
                this.render();
            });
        })
    }

    render(){
        render(this.template(), this.root);
    }

    template(){
        return html`
        <style>
            #add {
                font-size: 1em
            }
            .completed {
                text-decoration: line-through;
            }
            .record {
                display:inline;
            }
        </style>
        <input type="text" id="addField"/>
        <button id="add" @click=${_ => this.add()}>+</button>
        ${this.data.resource.map(
            (record) => html`
            <div class="container">
                <span class="record" @click=${_ => this.delete(record)}>&#128465;</span>
                <div contentEditable='true' class='record ${(this.isCompleted(record) ? 'completed' : '')}'>
                ${this.mapTodo(record)}
                </div>
            </div>
            `
          )}
        `;
    }

    mapTodo(record){
        return html `${this.formatTimestamp(record.COMPLETED_TSTAMP)} ${this.formatTimestamp(record.CREATED_TSTAMP)} ${record.NAME}`;
    }

    formatTimestamp(timestamp){
        if(timestamp === null){
            return "";
        }
        return timestamp.substring(0,10);
    }

    isCompleted(record){
        return record.COMPLETED_TSTAMP ? true : false; 
    }

    delete(record){
        apiClient().then(client => {
            client.delete('TODO', record.ID)
            .then((data) => {
                console.dir(data);
                this.getResource();
            });
        })
    }

    add(){
        let name = this.root.querySelector('#addField');
        apiClient().then(client => {
            client.add('TODO', { "resource" : [ {NAME: name.value} ] })
            .then((data) => {
                console.dir(data);
                this.getResource();
                name.value = "";
            });
        })
    }
}
customElements.define('todo-view', TodoView)