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
        document.addEventListener('vanilla-loggedout', e => {
            const { name } = e.detail;
            this.querySelector("div").innerHTML = `Not logged in!`;
        });
    }

    registerListener(e){
        e.onclick = evt => this.onLinkClicked(evt);
        window.onhashchange = evt => this.onAddressBarChanged(evt);
    }

    onAddressBarChanged(evt){
        const { location } = window;
        const { href } = location;
        const { hash } = location;
        const event = new CustomEvent('vanilla-nav', {
            detail : {
                href: href,
                hash: hash.substring(1),
            },
            bubbles: true
        });
        this.dispatchEvent(event);
        const element = this.querySelector(`[href="${hash}"]`);
        this.onLinkClicked({target: element});
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