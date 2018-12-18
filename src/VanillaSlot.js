import ApiClient from './services/ApiClient.js';

export default class VanillaSlot extends HTMLElement {

    constructor(){
        super();
        this.oldChild = null;
        this.root = this.attachShadow({mode: 'open'});
        //this.apiClient = new ApiClient();
    }

    connectedCallback(){
        document.addEventListener('vanilla-nav', e => this.onNavigation(e));
        document.addEventListener('vanilla-loggedin', e => {
            this.loadView('Home');
        });
        //this.apiClient.refreshSessionToken();
    }

    onNavigation(evt){
        const { detail } = evt;
        const { hash:linkName } = detail;
        this.loadView(linkName);
    }

    async loadView(linkName) {
        const {default: View} = await import(`./views/${linkName}View.js`);
        
        let newChild;
        if (View.prototype instanceof HTMLElement){
            newChild = new View();
            if (this.oldChild){
                this.root.replaceChild(newChild, this.oldChild);
            } else {
                this.root.appendChild(newChild);
            }
        } else {
            this.root.innerHTML = View;
            newChild = this.root.querySelector('article');
        }
        this.oldChild = newChild;
    }
}
customElements.define('vanilla-slot', VanillaSlot);