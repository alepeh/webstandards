import ApiClient from "./DBClient";

export default function apiClient(){

    return fetch('/config')
        .then(response => {
            return response.json();
        })
        .then(data => {
            return new ApiClient(data.apikey, data.apiurl);
        });
}

export function fileClient(){

    return fetch('/config')
        .then(response => {
            return response.json();
        })
        .then(data => {
            return new ApiClient(data.apikey, data.apiurl);
        });
}