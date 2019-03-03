export default class VanillaNav extends HTMLElement {

    constructor() {
        super();
        this.activeLink = null;
    }

    connectedCallback(){
        window.onhashchange = evt => this.onAddressBarChanged(evt);
        document.addEventListener('vanilla-loggedin', e => {
            const { name } = e.detail;
            this.querySelector("div").innerHTML = `Logged in as ${name}`;
        });
    }

    onAddressBarChanged(evt){
        console.log("Addressbar changed");
        const { location } = window;
        const { hash } = location;

        const request = this.parseUrl();
        const event = new CustomEvent('vanilla-nav', {
            detail : {
                request
            },
            bubbles: true
        });
        this.dispatchEvent(event);
    }

    parseUrl(){
        const { location } = window;

        let url = location.hash.slice(1) || '/';
        let r = url.split("/")
        let request = {
            route       : null,
            resource    : null,
            id          : null,
            verb        : null
        }
        request.resource    = r[1]
        request.id          = r[2]
        request.verb        = r[3]
        request.route = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '');
        return request;
    }
}
customElements.define('vanilla-nav', VanillaNav);