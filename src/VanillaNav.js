export default class VanillaNav extends HTMLElement {

    constructor() {
        super();
        this.activeLink = null;
    }

    connectedCallback(){
        //react to hash-change events once the element is upgraded
        window.onhashchange = _ => this.onAddressBarChanged();
        //wait for the main content element to be upgraded and let it display what is currently there
        window.customElements.whenDefined('vanilla-slot').then(_ => this.onAddressBarChanged());
    }

    onAddressBarChanged(){
        console.log("Addressbar changed");
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