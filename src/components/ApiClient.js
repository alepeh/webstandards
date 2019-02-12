import * as token from "./Token";

export default class ApiClient {

    constructor() {
        this.APIKEY = localStorage.getItem("apikey")
        this.API_BASE_PATH = localStorage.getItem("apiurl");
    }

    login(user, pass) {
        console.log("login with username: " + user);
        fetch(this.API_BASE_PATH + '/user/session', {
            method: 'post',
            mode: "cors",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                "email": user,
                "password": pass,
                "remember_me": true
            })
        })
        .then(this.status)
        .then(this.json)
        .then(this.saveToken)
        .then((data) => {
            const event = new CustomEvent('vanilla-loggedin', {
                detail: data,
                bubbles: true
            });
            document.dispatchEvent(event);
        })
        .catch((err) => {
            console.log('Fetch Error :-S', err);
        });
    }

    refreshSessionToken() {
        fetch(this.API_BASE_PATH + '/user/session', {
            method: "put",
            mode: "cors",
            headers: {
                "X-DreamFactory-Session-Token": token.getSessionTokenFromCookie(),
                "X-DreamFactory-API-Key": this.APIKEY
            }
        })
        .then(this.status)
        .then(this.json)
        .then(this.saveToken)
        .catch((err) => {
            console.log('Fetch Error on refresh :-S', err);
        });
    }

    status(response){
        if (response.status >= 200 && response.status < 300) {
            return Promise.resolve(response)
          } else if (response.status === 401) {
            console.log('Got 401 - Looks like session expired!');
            const event = new CustomEvent('vanilla-loggedout', {
                bubbles: true
            });
            document.dispatchEvent(event);
        } else {
            return Promise.reject(new Error(response.statusText))
          }
    }

    json(response) {
        return response.json();
    }

    saveToken(data) {
        token.saveSessionTokenInCookie(data.session_token);
        return data;
    }

    refreshTokenIfRequired(){
        if(token.isSessionTokenExpired()){
            console.log("Session Token is expired - trying to refresh")
            this.refreshSessionToken();
        }
        console.log("Session Token still valid")
        return Promise.resolve();
    }

    async fetchResources() {
        await this.refreshTokenIfRequired();
        return fetch(this.API_BASE_PATH + '/AWS_RDS1/_schema', {
            mode: "cors",
            headers: {
                "X-DreamFactory-Session-Token": token.getSessionTokenFromCookie(),
                "X-DreamFactory-API-Key": this.APIKEY
            }
        })
        .then(this.status)
        .then(this.json)
    }
}