import { html, render } from "lit-html";
import Todo from './Todo';

export default class TodoElement extends HTMLElement {
    
    constructor(){
        super();
        this.root = this.attachShadow({ mode: 'open' });
        this.todo;
    }

    static get observedAttributes(){
        return ['value'];
    }

    connectedCallback(){
        this._upgradeProperty('value');
        this.initializeAndRender(this.value);
    }

    _upgradeProperty(prop) {
        if (this.hasOwnProperty(prop)) {
          let value = this[prop];
          delete this[prop];
          this[prop] = value;
        }
    }

    initializeAndRender(value){
        this.todo = new Todo().parse(this.value);
        render(this.template(), this.root);
    }

    set value(val) {
        this.setAttribute('value', val);
        this.initializeAndRender(val);
    }
  
    get value() {
        return this.getAttribute('value');
    }

    template(){
        return html`
            <style>
                .container {
                    display: inline;
                    font-family: monospace;
                }
                .prio_A {
                    color: lightcoral;
                }
                .prio_B {
                    color: orange;
                }
                .prio_C {
                    color: blue;
                }
                .prio_D {
                    color: green;
                }
                .completed {
                    color: #aaa;
                    text-decoration: line-through;
                }
                #btn_save {
                    background: lightgreen;
                    color: fff;
                    font-family: monospace;
                }
                #btn_delete {
                    background: lightcoral;
                    color: fff;
                    font-family: monospace;
                }
                .hidden {
                    display: none;
                }
            </style>
            <div class="container ${this.todo.model.completed ? 'completed' : ''} prio_${this.removeBrackets(this.todo.model.priority)}" contenteditable=true @input=${e => this.onInput()} @focus=${e => this.onFocus()} @focusout=${e => this.onFocusOut()}>
                <div id="content" class="container">
                    <span>${this.todo.model.completionMark}</span>
                    <span>${this.todo.model.priority}</span>
                    <span>${this.todo.model.completionDate}</span>
                    <span>${this.todo.model.creationDate}</span>
                    <span>${this.todo.model.description}</span>
                </div>
                <span @click=${_ => this.onNewNote('1234')}>Note</span>
                <span id="btn_save" class="hidden" @click=${_ => this.onUpdate()}>Save</span>
                <span id="btn_delete" class="hidden" @click=${_ => this.onDelete()}>Delete</span>
            </div>
        `;
    }

    removeBrackets(priority){
        if(priority){
            priority = priority.replace('(','');
            priority = priority.replace(')','');
            return priority;
        }
        return '';
    }

    onInput(){
        this.getSaveButton().classList.remove('hidden');
    }

    onFocusOut(){
        this.getSaveButton().classList.add('hidden');
        this.getDeleteButton().classList.add('hidden');
    }

    onFocus(){
        this.getDeleteButton().classList.remove('hidden');
    }

    onUpdate(){
        const newVal = this.root.querySelector('#content').innerText;
        const oldVal = this.todo.value;
        const event = new CustomEvent('todo-updated', {
            detail: {
                oldValue : oldVal,
                newValue : newVal
            },
            bubbles: true
        });
        document.dispatchEvent(event);
    }

    onDelete(){
        const item = this.root.querySelector('#content').innerText;
        const event = new CustomEvent('todo-deleted', {
            detail: {
                value : item
            },
            bubbles: true
        });
        document.dispatchEvent(event);
    }

    getSaveButton(){
        return this.root.querySelector('#btn_save');
    }

    getDeleteButton(){
        return this.root.querySelector('#btn_delete');
    }

    onNewNote(id){
        const event = new CustomEvent('vanilla-nav', {
            detail : {
                request : {
                    resource: 'Note',
                    id: id,
                    verb: 'new-note',
                }
            },
            bubbles: true
        });
        document.dispatchEvent(event);
    }
}
customElements.define('todo-item', TodoElement);