import ApiClient from '../services/ApiClient.js';
import {html, render} from 'lit-html';

export default class TableView extends HTMLElement {

    constructor() {
        super();
        this.apiClient = new ApiClient();
        this.root = this.attachShadow({ mode: 'open' });
    }

    connectedCallback(){
        console.log("I've been called with schemaName:" + window.location.href);
    }
}
customElements.define('table-view', TableView);