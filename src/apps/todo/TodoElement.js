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
        this.todo = new Todo().parse(this.value);
        console.dir(this.todo);
        this.render();
    }

    _upgradeProperty(prop) {
        if (this.hasOwnProperty(prop)) {
          let value = this[prop];
          delete this[prop];
          this[prop] = value;
        }
    }

    set value(val) {
        this.setAttribute('value', val);
    }
  
    get value() {
        return this.getAttribute('value');
    }

    render(){
        render(this.template(), this.root);
    }

    template(){
        return html`
            <style>
                .container {
                    display: inline;
                    font-family: monospace;
                }
                .btn_save {
                    background: lightgreen;
                    color: fff;
                }
            </style>
            <div class="container" contenteditable=true>
            <span>${this.todo.model.priority}</span>
            <span>${this.todo.model.completionDate}</span>
            <span>${this.todo.model.creationDate}</span>
            <span>${this.todo.model.description}</span>
            </div>
            <span class="record btn_save" @click=${_ => this.onUpdate()}>Save</span>
        `;
    }

    onUpdate(){
        console.log("save");
    }
}
customElements.define('todo-item', TodoElement);