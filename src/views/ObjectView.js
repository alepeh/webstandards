import hyperHTML from 'hyperhtml';

export default class ObjectView extends HTMLElement {
    
    constructor() {
        super();
        this.APIKEY = localStorage.getItem("apikey")
        this.API_BASE_PATH = localStorage.getItem("apiurl");
        this.name = 'World';
        this.resources = [];
        this.html = hyperHTML.bind(
            this.attachShadow({ mode: 'open' })
        );
    }

    connectedCallback() {
        let cookie = document.cookie.split(';').filter((item) => item.includes('token='));
        this.fetchObjects(cookie[0].substring("token=".length));
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

    fetchObjects(token) {
        fetch(this.API_BASE_PATH+'/AWS_RDS1/_schema', {
            mode: "cors",
            headers: {
                "X-DreamFactory-Session-Token": token,
                "X-DreamFactory-API-Key": this.APIKEY
            }
        })
            .then((response) => {
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' +
                            response.status);
                        return;
                    }

                    // Examine the text in the response
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