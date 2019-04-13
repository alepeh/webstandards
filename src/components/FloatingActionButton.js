import {html, render} from 'lit-html';

export default class FloatingActionButton extends HTMLElement {

    constructor(){
        super();
        this.root = this.attachShadow({mode: 'open'});
    }

    connectedCallback(){
        render(this.template(), this.root);
    }

    template(){
        return html`
        <style>
        .fab {
            width: 60px;
            height: 60px;
            background-color: blue;
            border-radius: 50%;
            box-shadow: 0 6px 10px 0 #666;
            transition: all 0.1s ease-in-out;
          
            font-size: 40px;
            color: white;
            text-align: center;
            line-height: 60px;
          
            position: fixed;
            right: 50px;
            bottom: 50px;
         }
          
         .fab:hover {
            box-shadow: 0 6px 14px 0 #666;
            transform: scale(1.05);
         }
        </style>
        <div class="fab"> + </div>
        `;
    }
}
customElements.define('floating-action-button',FloatingActionButton);