
import SchemaView from './views/SchemaView';
import TableView from './views/TableView';
import HomeView from './views/HomeView';
import ItemView from './views/ItemView';
import FormView from './views/FormView';


export default class VanillaSlot extends HTMLElement {

    constructor(){
        super();
        this.oldChild = null;
        this.root = this.attachShadow({mode: 'open'});
        this.views = {
            'Home' : HomeView,
            'Schema' : SchemaView,
            'Table' : TableView,
            'Item' : ItemView,
            'Form' : FormView,
        }
    }

    connectedCallback(){
        document.addEventListener('vanilla-nav', e => this.onNavigation(e));
    }

    onNavigation(evt){
        console.log("onNav fired");
        const { detail } = evt;
        console.dir(detail);
        this.loadView(detail.request);
    }

    loadView(request) {
        const View = this.views[request.view];
        let newChild;
        console.dir(this.oldChild);
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