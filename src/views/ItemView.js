import {html, render} from 'lit-html';

export default class ItemView extends HTMLElement {

    constructor(request) {
        super();
        this.request = request;
        this.root = this.attachShadow({ mode: 'open' });
        this.schema;
        this.data;
    }

    connectedCallback(){
        render(this.template(), this.root);
    }

    template(){
        return html`
        <div>Item</div>
        ${Object.values(this.request.payload).map(
            (row) => html`
            <div>${row}</div>
          `
        )}
        `;
    }
}
customElements.define('item-view', ItemView);