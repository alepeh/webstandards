import {html, render} from 'lit-html';

export default class NoteView extends HTMLElement {

    constructor(){
        super();
        this.root = this.attachShadow({ mode: 'open' });
    }

    connectedCallback(){
        render(this.template(), this.root);
    }

    template(){
        return html`
        <style>
            .container {
                padding: 5px;
            }
        </style>
        <div class="container">
            I am the container
        </div>
        `;
    }
}
customElements.define('note-view', NoteView);