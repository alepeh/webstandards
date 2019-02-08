import ApiClient from '../components/ApiClient.js';
import {html, render} from 'lit-html';

export default class TableView extends HTMLElement {

    constructor(request) {
        super();
        this.request = request;
        this.apiClient = new ApiClient();
        this.root = this.attachShadow({ mode: 'open' });
    }

    connectedCallback(){
        console.log("I've been called with schemaName:" + this.request.id);
    }
}
customElements.define('table-view', TableView);