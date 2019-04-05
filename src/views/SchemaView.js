import * as clientFactory from '../components/ApiClientFactory.js';
import {html, render} from 'lit-html';

export default class ObjectView extends HTMLElement {
    
    constructor() {
        super();
        this.resources = [];
        this.root = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.getResources();
        this.render();
        document.addEventListener('vanilla-loggedin', _ => this.getResources());
    }

    render(){
        render(this.template(), this.root);
    }

    template(){
        return html`
        <style>
         a {
            padding: 8px 8px 8px 32px;
            text-decoration: none;
            text-transform: capitalize;
            font-size: 1em;
            color: #818181;
            display: block;
            transition: 0.3s;
          }  
         a:hover {
            color: #f1f1f1;
          }
        .navContainer {
            overflow:auto;
            height: calc(100% - 100px);
        }
        </style>
        <div class="navContainer">
        <b>Apps</b>
            <div><a href="#/Todo">Todo</a></div>
        <b>Tables</b>
        ${this.resources.map(
          (resource) => html`
            <div><a href="#/Table/${resource.name}">${this.capitalize(resource.name)}</a></div>
          `
        )}
        </div>`;
    }

    capitalize(text){
        return text.replace(/_/g, ' ').toLowerCase();
    }

    getResources(){
        clientFactory.apiClient().then(client => {
            client.fetchResources()
            .then((data) => {
                this.resources = data.resource;
                this.render();
                console.dir(data);
            }
        )
        })
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
    }
}
customElements.define('object-view', ObjectView);