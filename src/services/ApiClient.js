export default class ApiClient {
    
    constructor(){
        this.APIKEY = localStorage.getItem("apikey")
        this.API_BASE_PATH = localStorage.getItem("apiurl");
    }

    refreshSessionToken(){
        fetch(this.API_BASE_PATH + '/user/session', {
            method: "put",
            mode: "cors",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "X-DreamFactory-Session-Token": this.getSessionTokenFromCookie()
            }
        }).then((response) => {
                    if (response.status === 401) {
                        console.log('Got 401 - Looks like session expired!');
                        const event = new CustomEvent('vanilla-loggedout', {
                            bubbles: true
                        });
                        document.dispatchEvent(event);
                    }
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' + response.status);
                        return;
                    }
                    response.json().then((data) => {
                        console.dir(data);
                        this.saveSessionTokenInCookie(data.session_token);
                        const event = new CustomEvent('vanilla-loggedin', {
                            bubbles: true,
                            detail: data
                        });
                        document.dispatchEvent(event);
                    });
                }
            ).catch(function (err) {
                console.log('Fetch Error :-S', err);
            });
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
        }).then((response) => {
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' + response.status);
                        return;
                    }
                    response.json().then((data) => {
                        this.saveSessionTokenInCookie(data.session_token);                   
                        const event = new CustomEvent('vanilla-loggedin', {
                            detail: data,
                            bubbles: true
                        });
                        document.dispatchEvent(event);
                    });
                }
            ).catch(function (err) {
                console.log('Fetch Error :-S', err);
            });
    }

    fetchResources() {
        return fetch(this.API_BASE_PATH+'/AWS_RDS1/_schema', {
            mode: "cors",
            headers: {
                "X-DreamFactory-Session-Token": this.getSessionTokenFromCookie(),
                "X-DreamFactory-API-Key": this.APIKEY
            }
        })
    }

    saveSessionTokenInCookie(sessionToken){
        let d = new Date();
        d.setTime(d.getTime() + (30 * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        console.log("Session Token: " + sessionToken);
        document.cookie = "token=" + sessionToken + ";" + expires;
    }

    getSessionTokenFromCookie(){
        if (!document.cookie){
            return;
        }
        let cookie = document.cookie.split(';').filter((item) => item.includes('token='));
        return cookie[0].substring("token=".length);
    }
}