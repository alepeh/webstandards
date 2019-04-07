import * as token from "./Token";
import * as response from "./ResponseUtils";
import AuthenticationClient from "./AuthenticationClient";

const SERVICE = 's3/';

export default class RemoteFileApiClient {

    constructor(apikey, apiBasePath, authenticationClient) {
        this.APIKEY =  apikey;
        this.API_BASE_PATH = apiBasePath;
        this.authClient = authenticationClient;
    }

    async getFileOrFolder(path) {
        await this.authClient.refreshTokenIfRequired();
        return fetch(this.API_BASE_PATH + '/' + SERVICE + path, {
            mode: "cors",
            headers: {
                "X-DreamFactory-Session-Token": token.getSessionTokenFromCookie(),
                "X-DreamFactory-API-Key": this.APIKEY
            }
        })
        .then(response.status)
        .then(body => {return body.text()});
    }

    async updateFileOrFolder(path, data) {
        await this.authClient.refreshTokenIfRequired();
        console.dir(data);
        return fetch(this.API_BASE_PATH + '/' + SERVICE + path, {
            mode: "cors",
            method: "PUT",
            headers: {
                "X-DreamFactory-Session-Token": token.getSessionTokenFromCookie(),
                "X-DreamFactory-API-Key": this.APIKEY,
                "Content-Type": "raw; charset=utf-8"
            },
            body: data
        })
        .then(response.status)
        .then(body => {return body.text()});
    }

}