import {html, render} from 'lit-html';

export default class ItemView extends HTMLElement {

    constructor(request) {
        super();
        this.fields = request.payload.fields;
        this.root = this.attachShadow({ mode: 'open' });
        this.data = request.payload.data;
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
        ${Object.keys(this.data).map(
            (row) => html`
            <tr>
            <td>${row}</td>
            <td><input .value=${this.data[row]} @change=${e => this.inputChanged(e,row)}></input></td>
            </tr>
          `
        )}
        </table>
        <button @click=${_ => this.save()}>Save</button>
        `;
    }

    save(){
        console.log(this.data);
    }

    inputChanged(e,field){
        console.dir(e);
        console.log(field);
    }
}
customElements.define('item-view', ItemView);