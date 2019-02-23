export default class VanillaNav extends HTMLElement {

    constructor() {
        super();
        this.activeLink = null;
    }

    connectedCallback(){
        this.activeLinkClass = 'active-link';
        const links = this.querySelectorAll("a");
        console.log(links);
        links.forEach(e => this.registerListener(e));
        document.addEventListener('vanilla-loggedin', e => {
            const { name } = e.detail;
            this.querySelector("div").innerHTML = `Logged in as ${name}`;
        });
    }

    registerListener(e){
        e.onclick = evt => this.onLinkClicked(evt);
        window.onhashchange = evt => this.onAddressBarChanged(evt);
    }

    onAddressBarChanged(evt){
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
        const element = this.querySelector(`[href="${hash}"]`);
        this.onLinkClicked({target: element});
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

    onLinkClicked(evt) { 
        const { target } = evt;
        if (this.activeLink) { 
            this.activeLink.classList.toggle(this.activeLinkClass);
        }
        this.activeLink = target;
        this.activeLink.classList.toggle(this.activeLinkClass);
    }
}
customElements.define('vanilla-nav', VanillaNav);