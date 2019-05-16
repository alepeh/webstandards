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
            view    : null,
            resource          : null,
            id : null,
            verb        : null
        }
        request.view    = r[1]
        request.resource          = r[2]
        request.id = r[3]
        request.verb        = r[4]
        request.route = (request.view ? '/' + request.view : '/') + (request.resource ? '/:resource' : '') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '');
        return request;
    }
}
customElements.define('vanilla-nav', VanillaNav);