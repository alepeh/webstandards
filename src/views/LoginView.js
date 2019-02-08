import ApiClient from '../components/ApiClient.js';

export default class LoginView extends HTMLElement {

    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'open' });
        this.apiClient = new ApiClient();
    }

    connectedCallback() {
        this.root.innerHTML = `
            <h3>Login</h3>
            <form>
                <label for="username">Username</label>
                <input type="text" name="username" id="username"/><br/>
                <label for="password">Password</label>
                <input type="password" name="password" id="password"/>
                <button>Login</button>
            </form>
            `;
        this.usernameInput = this.root.querySelector('#username');
        this.passwordInput = this.root.querySelector('#password');
        this.root.querySelector('button').onclick = _ => this.login();
    }

    login() {
        this.apiClient.login(this.usernameInput.value, this.passwordInput.value);
    }
}
customElements.define('login-view', LoginView);