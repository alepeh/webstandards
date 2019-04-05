import apiClient from '../../components/ApiClientFactory.js';
import spinner from '../../components/Spinner.js'
import {html, render} from 'lit-html';

export default class TodoView extends HTMLElement {
    constructor(){
        super();
        this.apiClient =  apiClient();
        this.root = this.attachShadow({ mode: 'open' });
        this.data;
        this.previouslyFocused;
    }

    connectedCallback(){
        render(spinner(), this.root);
        this.getResource();
    }

    getResource(){
        apiClient().then(client => {
            client.fetchResourceData('TODO?order=COMPLETED_TSTAMP,PRIORITY')
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
                color: #bbb;
            }
            .container {
                padding: 5px;
            }
            .record {
                display:inline;
                padding: 5px;
            }
            input {
                width: 80%;
            }
            .hidden {
                display: none;
            }
            .btn_complete {
                background: lightblue;
                padding: 5px;
            }
            .btn_delete {
                background: red;
                color: fff;
            }
            .btn_save {
                background: lightgreen;
                color: fff;
            }
        </style>
        <input type="text" id="addField"/>
        <button id="add" @click=${_ => this.add()}>+</button>
        ${this.data.resource.sort(this.compare).map(
            (record) => html`
            <div class="container">
                <span class="record btn_complete" @click=${_ => this.complete(record)}>&#10003;</span>
                    <div id=${"todo_"+record.ID} contenteditable="true" @focus=${e => this.onFocus(record.ID)} @input=${e => this.onInput(record.ID)} class='record ${(this.isCompleted(record) ? 'completed' : '')}'>
                            ${this.serializeTodo(record)}
                    </div>
                    <span class="record hidden btn_delete" id=${"delete_"+record.ID} @click=${_ => this.delete(record)}>Delete</span>
                    <span class="record hidden btn_save" id=${"save_"+record.ID} @click=${_ => this.onUpdate(record.ID)}>Save</span>
            </div>
            `
          )}
        `;
    }

    compare(a,b){
        if(a.PRIORITY === "" || a.PRIORITY === null) return 1;
        if(b.PRIORITY === "" || b.PRIORITY === null) return -1;
        if(a.PRIORITY === b.PRIORITY) return 0;
        return a.PRIORITY < b.PRIORITY ? -1 : 1;
    }

    serializeTodo(record){
        return html `${this.mapPriority(record.PRIORITY)} ${this.formatTimestamp(record.COMPLETED_TSTAMP)} ${this.formatTimestamp(record.CREATED_TSTAMP)} ${record.NAME}`;
    }

    mapPriority(priority){
        return priority ? '('+ priority + ')' : '';
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
                this.getResource();
            });
        })
    }

    add(){
        let name = this.root.querySelector('#addField');
        apiClient().then(client => {
            client.add('TODO', { "resource" : [ {NAME: name.value} ] })
            .then((data) => {
                this.getResource();
                name.value = "";
            });
        })
    }

    complete(record){
        const completedDate = new Date();
        apiClient().then(client => {
            client.partialUpdate('TODO', record.ID, {COMPLETED_TSTAMP: completedDate, PRIORITY: ''})
            .then((data) => {
                this.getResource();
            });
        })
    }

    onInput(e){
        this.getSaveButtonForTodo(e).classList.remove('hidden');
    }

    onFocus(e){
        if(this.previouslyFocused){
            this.getDeleteButtonForTodo(this.previouslyFocused).classList.add('hidden');
        }
        this.previouslyFocused = e;
        this.getDeleteButtonForTodo(e).classList.remove('hidden');
    }

    onUpdate(id){
        const changedTodo = this.root.querySelector('#todo_'+id).innerText;
        const todo = this.deserializeTodo(changedTodo);
        apiClient().then(client => {
            client.partialUpdate('TODO', id, todo)
            .then((data) => {
                console.dir(data);
                this.getResource();
            });
        })
        this.getSaveButtonForTodo(id).classList.add('hidden');
    }

    deserializeTodo(todoText){
        //we are only interested in PRIORITY and/or NAME
        //other fields are not updated atm.
        let todo = {};
        if(todoText.startsWith('(')){
            todo.PRIORITY = todoText.substring(1,2);
            todo.NAME = todoText.substring(14).trim();
        } else {
            todo.NAME = todoText.substring(11).trim();
        }
        return todo;
    }

    getSaveButtonForTodo(id){
        return this.root.querySelector('#save_'+id);
    }

    getDeleteButtonForTodo(id){
        return this.root.querySelector('#delete_'+id);
    }
}
customElements.define('todo-view', TodoView)