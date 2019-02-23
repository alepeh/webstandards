
export default class VanillaSlot extends HTMLElement {

    constructor(){
        super();
        this.oldChild = null;
        this.root = this.attachShadow({mode: 'open'});
    }

    connectedCallback(){
        document.addEventListener('vanilla-nav', e => this.onNavigation(e));
    }

    onNavigation(evt){
        const { detail } = evt;
        this.loadView(detail.request);
    }

    async loadView(request) {
        const {default: View} = await import(`./views/${request.resource}View.js`);
        let newChild;
        if (View.prototype instanceof HTMLElement){
            newChild = new View(request);
            if (this.oldChild){
                this.root.replaceChild(newChild, this.oldChild);
            } else {
                console.log("First navigation event");
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