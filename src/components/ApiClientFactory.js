import ApiClient from "./DBApiClient";
import RemoteFileClient from "./RemoteFileApiClient";
import AuthenticationClient from "./AuthenticationClient";

let authClient;

function dbApiClient(){

    return fetch('/config')
        .then(response => {
            return response.json();
        })
        .then(data => {
            return new ApiClient(data.apikey, data.apiurl);
        });
}

async function remoteFileApiClient(){
    await authenticationClient().then(client => {
        authClient =  client;
    });
    return fetch('/config')
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.dir(authClient);
            return new RemoteFileClient(data.apikey, data.apiurl, authClient);
        });
}

async function authenticationClient(){

    return fetch('/config')
        .then(response => {
            return response.json();
        })
        .then(data => {
            return new AuthenticationClient(data.apikey, data.apiurl);
        });
}

export {dbApiClient as apiClient, remoteFileApiClient, authenticationClient}