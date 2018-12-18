export default class ObjectView extends HTMLElement {
    
    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'open' });
        this.APIKEY = localStorage.getItem("apikey")
        this.API_BASE_PATH = localStorage.getItem("apiurl");
    }

    connectedCallback() {
        this.root.innerHTML = `
            <h3>Objects</h3>
            `;
        let cookie = document.cookie.split(';').filter((item) => item.includes('token='));
        this.fetchObjects(cookie[0].substring("token=".length));
    }

    fetchObjects(token) {
        fetch(this.API_BASE_PATH+'/AWS_RDS1/_schema', {
            mode: "cors",
            headers: {
                "X-DreamFactory-Session-Token": token,
                "X-DreamFactory-API-Key": this.APIKEY
            }
        })
            .then(
                function (response) {
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' +
                            response.status);
                        return;
                    }

                    // Examine the text in the response
                    response.json().then(function (data) {
                        console.log(data);
                    });
                }
            )
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            });
    }
}
customElements.define('object-view', ObjectView);