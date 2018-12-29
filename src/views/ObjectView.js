import ApiClient from '../services/ApiClient.js';
import hyperHTML from 'hyperhtml';

export default class ObjectView extends HTMLElement {
    
    constructor() {
        super();
        this.apiClient = new ApiClient();
        this.resources = [];
        this.html = hyperHTML.bind(
            this.attachShadow({ mode: 'open' })
        );
    }

    connectedCallback() {
        this.getResources();
        this.render();
    }

    render(){
        return this.html`
        <div> Resource list: </div>
        <p></p>${this.resources.map(
          resource => hyperHTML.wire(resource)`
          <div>name: <span> ${resource.name} </span></div>
          <p></p>`
        )}`;
    }

    getResources(){
        this.apiClient.fetchResources()
            .then((response) => {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }
                response.json().then((data) => {
                    this.resources = data.resource;
                    this.render();
                    console.log(data);
                }).catch(error => console.error('Error:', error));
            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
    }
}
customElements.define('object-view', ObjectView);