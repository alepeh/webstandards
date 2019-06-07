import { html, render } from "lit-html";

export default class NavButton extends HTMLElement {

    constructor(){
        super();
        this.navigationStack = [];
        this.root = this.attachShadow({ mode: 'open' });
    }

    connectedCallback(){
        document.addEventListener('vanilla-nav', e => this.pushNavigationEvent(e));
        render(this.template(), this.root);
    }

    pushNavigationEvent(e){
        if(! e.detail.backNavigation){
            this.navigationStack.push(e);
        }
    }

    template(){
        return html`<span @click=${_ => this.goBack()}>⬅</span>`;
    }

    goBack(){
        this.navigationStack.pop();
        const event = this.navigationStack[this.navigationStack.length-1];
        console.dir(event);
        event.detail.backNavigation = true;
        this.dispatchEvent(event);
    }
}
customElements.define('nav-button', NavButton);