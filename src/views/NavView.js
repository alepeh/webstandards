import {html, render} from 'lit-html';
export default class NavView extends HTMLElement {

    constructor(){
        super();
        this.root = this;
    }

    connectedCallback(){
        this.render();
        this.openNavButton = document.querySelector(".openNav");
        this.openNavButton.addEventListener("click", _ => {
            this.openNav();
        });
    }

    render(){
        render(this.template(), this.root);
    }

    template(){
        return html`
        <div id="mySidenav" class="sidenav">
            <a href="javascript:void(0)" class="closebtn" @click="${_ => this.closeNav()}">&times;</a>
            <object-view/>
        </div>
        `;
    }

    closeNav() {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("content").style.marginLeft = "10";
    }

    openNav() {
        document.getElementById("mySidenav").style.width = "250px";
        document.getElementById("content").style.marginLeft = "260px";
      }
}
customElements.define('nav-view', NavView);