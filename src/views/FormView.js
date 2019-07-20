import * as clientFactory from '../components/ApiClientFactory.js';
import * as converter from '../components/AlpacaSchemaConverter.js';

export default class FormView extends HTMLElement {

    constructor(request) {
        super();
        this.request = request;
        this.root = this.attachShadow({ mode: 'open' });
        this.data;
        this.changedData = {};
        this.id = request.id;
        this.resource = request.resource;
        this.verb = request.verb;
        this.schema;
    }

    connectedCallback(){
        this.root.innerHTML = `
        <style>
            @import url("//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css");
            @import url("//cdn.jsdelivr.net/npm/alpaca@1.5.27/dist/alpaca/bootstrap/alpaca.min.css");
        </style>
        <input id="btnSer" type="button" value="Serialze"></input>
        <div id="alpa"></div>
        `;
        this.fetchDataFromBackend(this.resource, this.id);
        this.root.getElementById("btnSer").addEventListener('click', _ => this.serialize());
    }

    async fetchDataFromBackend(name, id){
        await clientFactory.apiClient().then(client => {
            client.fetchResourceSchema(name)
            .then((schema) => {
                this.schema = schema;
            })
            .then(_ => {
                if(id){
                    clientFactory.apiClient().then(client => {
                        client.fetchResourceDataById(name, id)
                        .then((data) => {
                        this.data = data;
                        console.dir(data);
                        this.render();
                        });
                    })
                }
            })
        })
    }

    render(){
        $(this.root.getElementById("alpa")).alpaca({
            "schema": converter.convertDreamfactoryToAlpacaSchema(this.schema),
            "data": converter.convertDreamFactoryDataToAlpacaData(this.data),
            "options": {
                "fields" : {
                    "SORTIERUNG" : {
                        "events": {
                            "mouseover": function() {
                                console.log(this.name + ": mouseover");
                            },
                    }
                }
                },
                "form": {
                    "buttons": {
                        "serialize": {
                            "title": "Serialize",
                            "click": function() {
                                var value = this.getValue();
                                console.log(this.name + ": ser");
                            }
                        }
                    }
                }
            }
        });
    }

    save(){
        this.toggleSaveButton();
        if(this.verb === 'edit'){
            console.log('edit');
            clientFactory.apiClient().then(client => {
                client.partialUpdate(this.resource, this.data['ID'], this.changedData);
            }).then(_ => {
                this.toggleSaveButton();
            }
            );
        }
        else if(this.verb === 'add'){
            console.log('add');
            let newRecord = {"resource" : [
                this.changedData
            ]};
            clientFactory.apiClient().then(client => {
                client.add(this.resource, newRecord);
            }).then(_ => {
                this.toggleSaveButton();
            }
            );
        }
    }

    inputChanged(e,field){
        this.changedData[field] = e.target.value;
    }

    toggleSaveButton(){
        this.root.getElementById('saveBtn').toggle();
    }

    serialize(){
        let value = $(this.root.getElementById("alpa")).alpaca().getValue();
        console.log(value);
    }
}
customElements.define('form-view', FormView);