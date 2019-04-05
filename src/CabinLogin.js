import * as clientFactory from './components/ApiClientFactory';
 
export default class CabinLogin extends HTMLElement {

    constructor(){
        super();
    }

    connectedCallback(){
        this.usernameInput = this.querySelector('#username');
        this.passwordInput = this.querySelector('#password');
        this.modal = document.querySelector(".modal");
        this.closeButton = document.querySelector(".close-button");
        this.closeButton.addEventListener("click", _ => this.toggleModal());

        window.addEventListener("click", e => {
            this.windowOnClick(e);
        });
        
        this.querySelector('button').onclick = _ => this.login();

        document.addEventListener('vanilla-loggedin', e => {
            this.hideModal();
        }); 
        document.addEventListener('vanilla-loggedout', e => {
            this.showModal();
        }); 
    }

    login(){
        clientFactory.apiClient().then(client => {
            client.login(this.usernameInput.value, this.passwordInput.value);
        });
    }

    toggleModal() {
        this.modal.classList.toggle("show-modal");
    }

    hideModal(){
        this.modal.classList.remove("show-modal");
    }

    showModal(){
        this.modal.classList.add("show-modal");
    }

    windowOnClick(event) {
        if (event.target === this.modal) {
            this.toggleModal();
        }
    }
}
customElements.define('cabin-login', CabinLogin);