import * as clientFactory from '../../components/ApiClientFactory.js';
import spinner from '../../components/Spinner.js'
import {html, render} from 'lit-html';
import TodoElement from './TodoElement';

export default class TodoFileView extends HTMLElement {
    constructor(){
        super();
        this.root = this.attachShadow({ mode: 'open' });
        this.data;
        this.previouslyFocused;
    }

    connectedCallback(){
        render(spinner(), this.root);
        document.addEventListener('todo-updated', e => this.onUpdate(e));
        document.addEventListener('todo-deleted', e => this.onDelete(e));
        this.getResource();
    }

    getResource(){
        clientFactory.remoteFileApiClient().then(client => {
            client.getFileOrFolder('org/todo.txt')
            .then((data) => {
                console.log(data);
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
        </style>
        <input type="text" id="addField"/>
        <button id="add" @click=${_ => this.add()}>+</button>
        ${this.data.split('\n').sort().map(line =>  html`
            <div><todo-item value='${line}'></todo-item></div>
            `
        )}
        `;
    }

    onDelete(e){
        console.dir(e);
    }

    add(){
        let val = this.root.querySelector('#addField');
        this.data = this.data.concat(val.value,'\n');
        clientFactory.remoteFileApiClient().then(client => {
            client.updateFileOrFolder('org/todo.txt', this.data)
            .then((data) => {
                this.getResource();
            });
        })
    }

    onUpdate(e){
        const oldValue = e.detail.oldValue;
        const newValue = e.detail.newValue;
        this.data = this.data.replace(oldValue, newValue);
        clientFactory.remoteFileApiClient().then(client => {
            client.updateFileOrFolder('org/todo.txt', this.data)
            .then((data) => {
                this.getResource();
            });
        })
    }
}
customElements.define('todo-file-view', TodoFileView)