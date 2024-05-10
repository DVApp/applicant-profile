import axios from "axios";


export function httpService(endpoint, method, body) {
    let url = process.env.REACT_APP_SERVER_URL + endpoint;
    return axios[method](url, body)
        .then(response => {
            return { success: true, data: response.data };
        })
        .catch(error => {

            return { success: false, errors: error.response };
        });
}
